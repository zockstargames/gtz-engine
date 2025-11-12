import type React from "react"
import "./globals.css"

export const metadata = {
  title: "GTZ - Grand Theft Zcash | Built in Shadows, Played in Freedom",
  description:
    "A decentralized version of GTA built on Solana and powered by the ethos of Zcash. Privacy-first, community-driven, open-source gaming for the onchain generation.",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: "#F7931A",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white font-['Helvetica_Now_Text',sans-serif]">{children}</body>
    </html>
  )
}
