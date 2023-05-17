import React from 'react'
import './globals.css'
import AppBar from './dashboard/components/AppBar'

export const metadata = {
  title: 'Gemet',
  description: 'Gestion Metrologica'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <AppBar />
        {children}
      </body>
    </html>
  )
}
