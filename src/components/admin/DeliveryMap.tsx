"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet takes raw HTML for a marker, so the storefront glyph is inlined as
// SVG (lucide's "store") rather than pulled in as a React component.
const STORE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/></svg>`;

const branchIcon = L.divIcon({
  className: "",
  html: `<div style="width:28px;height:28px;border-radius:9999px;background:#16a34a;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;">${STORE_SVG}</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

interface Branch {
  id: string;
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
}

/**
 * Leaflet caches the container size and only redraws when told. Without this
 * the map keeps its old dimensions after the card is resized — going
 * fullscreen would leave the tiles filling just the original box.
 */
function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);
  return null;
}

/**
 * Turns a click on the map into coordinates. Rendered only while the admin is
 * placing a branch, so an ordinary click still pans the map.
 */
function ClickPicker({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function DeliveryMap({
  branches,
  onPick,
}: {
  branches: Branch[];
  /** When set, the next click on the map reports its position instead of panning. */
  onPick?: (lat: number, lng: number) => void;
}) {
  const points = branches.filter(
    (b): b is Branch & { lat: number; lng: number } => b.lat != null && b.lng != null
  );

  const center: [number, number] =
    points.length > 0
      ? [
          points.reduce((s, b) => s + b.lat, 0) / points.length,
          points.reduce((s, b) => s + b.lng, 0) / points.length,
        ]
      : [41.2995, 69.2401];

  // Leaflet resolves its default marker icons relative to the CSS, which a
  // bundler breaks. We render divIcon markers so these are only a fallback,
  // but they are served from public/leaflet/ rather than a CDN — an external
  // host that fails to resolve would silently blank the markers.
  useEffect(() => {
    // @ts-expect-error leaflet internal
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={11}
      scrollWheelZoom={false}
      className={`h-full w-full ${onPick ? "cursor-crosshair" : ""}`}
    >
      <ResizeHandler />
      {onPick && <ClickPicker onPick={onPick} />}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.length > 1 && (
        <Polyline
          positions={points.map((b) => [b.lat, b.lng])}
          pathOptions={{ color: "#4a3aa7", weight: 3, dashArray: "6 6", opacity: 0.6 }}
        />
      )}
      {points.map((b) => (
        <Marker key={b.id} position={[b.lat, b.lng]} icon={branchIcon}>
          <Popup>
            <strong>{b.name}</strong>
            <br />
            {b.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
