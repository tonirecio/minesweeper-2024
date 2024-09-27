import React from 'react'
export const metadata = {
  title: 'Minesweeper',
  description: 'The classic Minesweeper game made in React.Js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
