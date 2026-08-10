"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const branchIcon = L.divIcon({
  className: "",
  html: `<div style="width:28px;height:28px;border-radius:9999px;background:#16a34a;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;color:white;font-size:13px;">🏬</div>`,
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

export default function DeliveryMap({ branches }: { branches: Branch[] }) {
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
      className="h-full w-full"
    >
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
