import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-black relative">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2V5ssMdubVt4qbNfS17xsG-voXbvWb1qFHoRJqrv9ZlSxRsJSvpj8.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>
      <div className="relative z-20 h-full">{children}</div>
    </div>
  )
}
