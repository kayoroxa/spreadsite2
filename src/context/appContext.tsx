'use client'

import { Dispatch, SetStateAction } from 'react'

export interface AppParams {
  isDevMode: boolean
}

export interface AppContext {
  appParams: AppParams
  setParams: Dispatch<SetStateAction<AppParams>>
}

import { createContext, ReactNode, useState } from 'react'

const dataContext = createContext({} as AppContext)

export default dataContext

interface Props {
  children: ReactNode
}

export function AppContextProvider({ children }: Props) {
  const [appParams, setParams] = useState<AppParams>({})

  return (
    <dataContext.Provider value={{ appParams, setParams }}>
      {children}
    </dataContext.Provider>
  )
}
