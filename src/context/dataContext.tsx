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
  dataBase: any[]
  setDataBase: Dispatch<SetStateAction<any[]>>
}

import { createContext, ReactNode, useState } from 'react'

const dataContext = createContext({} as DataContext)

export default dataContext

interface Props {
  children: ReactNode
}

type Section = {
  id: string
  Element: ReactNode
  Children: ReactNode[]
}

export function DataContextProvider({ children }: Props) {
  const [data, setData] = useState<Data>({})
  const [dataBase, setDataBase] = useState<any[]>([])

  return (
    <dataContext.Provider value={{ data, setData, dataBase, setDataBase }}>
      {children}
    </dataContext.Provider>
  )
}
