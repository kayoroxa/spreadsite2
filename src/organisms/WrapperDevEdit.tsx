import { ReactNode } from 'react'
import DevSideTools from '../molecules/DevSideTools'

interface Props {
  children: ReactNode
  className?: string
}

export default function WrapperDevEdit({ children, className }: Props) {
  return (
    <div className="flex bg-zinc-900">
      <DevSideTools />
      <main className={'overflow-auto max-h-screen w-full p-4 '}>
        <div className={'dark:bg-zinc-800 ' + ' ' + className}>{children}</div>
      </main>
    </div>
  )
}
