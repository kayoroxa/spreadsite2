import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="dark">
      <head />
      <body className="dark:bg-zinc-800 dark:text-white">{children}</body>
    </html>
  )
}
