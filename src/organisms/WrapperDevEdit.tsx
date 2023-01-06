import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import DevSideTools from '../molecules/DevSideTools'
import { _Controls } from '../utils/@types/_DevEdit'

interface Props {
  children: ReactNode
  className?: string
}

interface _Context {
  childEdit: ReactNode
  controls: _Controls
  setControls: Dispatch<SetStateAction<_Controls>>
  setChildEdit: Dispatch<SetStateAction<ReactNode>>
}

export const devContext = createContext<_Context>({} as _Context)

export default function WrapperDevEdit({ children, className }: Props) {
  const [childEdit, setChildEdit] = useState<ReactNode>()
  const [controls, setControls] = useState<_Controls>({} as _Controls)
  // const [controlsValues, setControlsValues] = useState<_Control[]>()

  return (
    <div className="flex bg-zinc-900">
      <devContext.Provider
        value={{ childEdit, setChildEdit, controls, setControls }}
      >
        <DevSideTools />
        <main className={'overflow-auto max-h-screen w-full p-4 '}>
          <div className={'dark:bg-zinc-800 ' + ' ' + className}>
            {children}
          </div>
        </main>
      </devContext.Provider>
    </div>
  )
}
