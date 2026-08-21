import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteChrome from "@/components/layout/SiteChrome";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { StoreNameProvider } from "@/context/StoreNameContext";
import { getStoreName } from "@/lib/store-name";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * The shop name comes from Sozlamalar, so the tab title has to be built at
 * request time rather than declared as a constant. `template` appends it to
 * every page's own title — pages set only their part.
 */
export async function generateMetadata(): Promise<Metadata> {
  const storeName = await getStoreName();

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
    ),
    title: {
      default: `${storeName} — onlayn oziq-ovqat do'koni`,
      template: `%s — ${storeName}`,
    },
    description:
      "Kundalik oziq-ovqat va maishiy mahsulotlarni onlayn buyurtma qiling, tez va qulay yetkazib berish xizmatidan foydalaning.",
    openGraph: {
      type: "website",
      locale: "uz_UZ",
      siteName: storeName,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeName = await getStoreName();

  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <StoreNameProvider value={storeName}>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <SiteChrome header={<Header />} footer={<Footer />}>
                  {children}
                </SiteChrome>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </StoreNameProvider>
      </body>
    </html>
  );
}
