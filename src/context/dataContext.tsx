'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'
import initial from '../utils/mock-data.json'
export interface Data {
  [id: string]: {
    jsRaw: string
    jsEval: any
  }
}

export interface DataContext {
  data: Data
  setData: Dispatch<SetStateAction<Data>>
  dataBase: _DataBase[]
  setDataBase: Dispatch<SetStateAction<_DataBase[]>>
  elementsData: _ComponentsData
  setElementsData: Dispatch<SetStateAction<_ComponentsData>>
}

import { createContext, ReactNode, useState } from 'react'
import { _ComponentsData } from '../utils/@types/_Components'
import { _DataBase } from '../utils/@types/_DataBase'

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
  const [dataBase, setDataBase] = useState<_DataBase[]>([])
  const [elementsData, setElementsData] = useState<_ComponentsData>(
    {} as _ComponentsData
  )

  useEffect(() => {
    const dbID = '784'
    setDataBase(prev => {
      const newPrev = [...prev]
      newPrev.push({ id: dbID, name: 'tabela nutricional', data: initial })
      return newPrev
    })
  }, [])

  return (
    <dataContext.Provider
      value={{
        data,
        setData,
        dataBase,
        setDataBase,
        elementsData,
        setElementsData,
      }}
    >
      {children}
    </dataContext.Provider>
  )
}
