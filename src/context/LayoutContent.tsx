'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

type Section = {
  id: string
  Element: ReactNode
  // Children?: ((prop: unknown) => ReactNode)[]
}

type Layout = Section[]

export interface Data {
  layout: Layout
  setLayout: Dispatch<SetStateAction<Layout>>
}

const layoutContext = createContext({} as Data)

export default layoutContext

interface Props {
  children: ReactNode
}

export function LayoutContextProvider({ children }: Props) {
  const [layout, setLayout] = useState<Layout>([])

  return (
    <layoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </layoutContext.Provider>
  )
}
