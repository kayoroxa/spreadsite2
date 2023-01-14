import { useContext } from 'react'
import TextArea from '../atoms/TextArea'
import { devContext } from '../organisms/WrapperDevEdit'
import useToolKitStore from '../store/useToolKitStore'

export default function Edit() {
  const { childEdit, setControls } = useContext(devContext)
  const controls = useToolKitStore(state => state.controls)

  return (
    <section className="w-[20vw] bg-zinc-300 flex flex-col  items-start ">
      <header className="w-full flex gap-2 p-2 py-4 bg-zinc-600">
        <div className="flex-1   bg-zinc-300/80 text-black text-center px-4 py-2 rounded-lg hover:cursor-pointer">
          CSS
        </div>
        <div className="flex-1 bg-zinc-300/80 text-black text-center px-4 py-2 rounded-lg hover:cursor-pointer">
          Child
        </div>
      </header>
      <div className="flex flex-wrap gap-4 w-full p-6 ">{childEdit}</div>
      <div className="flex flex-wrap gap-4 w-full p-6 text-black">
        {JSON.stringify(controls)}
        {Object.entries(controls).map(([id, c]) => {
          if (c.type === 'textArea') {
            return (
              <TextArea
                valueAlternative={String(c.value)}
                className="w-full h-96"
                onTextChange={value => {
                  console.log('mudou')
                  setControls(prev => ({
                    ...prev,
                    [id]: { ...controls[id], value },
                  }))
                }}
              />
            )
          }
          return <input />
        })}
      </div>
    </section>
  )
}
