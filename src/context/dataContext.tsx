'use client'

import { Dispatch, SetStateAction } from 'react'

export interface Data {
  [id: string]: {
    jsRaw: string
    jsEval: any
  }
}

export interface DataContext {
  data: Data
  setData: Dispatch<SetStateAction<Data>>
}

import { createContext, ReactNode, useState } from 'react'

const dataContext = createContext({} as DataContext)

export default dataContext

interface Props {
  children: ReactNode
}

export function DataContextProvider({ children }: Props) {
  const [data, setData] = useState<Data>({})

  return (
    <dataContext.Provider value={{ data, setData }}>
      {children}
    </dataContext.Provider>
  )
}
