'use client'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DataContextProvider } from '../context/dataContext'
import { LayoutContextProvider } from '../context/LayoutContent'
import '../styles/globals.css'
import '../test/styles.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutContextProvider>
      <DataContextProvider>
        <DndProvider backend={HTML5Backend}>
          <html className="dark">
            <head />
            <body className="dark:bg-zinc-800 dark:text-white">{children}</body>
          </html>
        </DndProvider>
      </DataContextProvider>
    </LayoutContextProvider>
  )
}
