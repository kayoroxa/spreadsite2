import { useContext } from 'react'
import TextArea from '../atoms/TextArea'
import { devContext } from '../organisms/WrapperDevEdit'
import useElementStore from '../store/useElementStore'
import useToolKitStore from '../store/useToolKitStore'

export default function Edit() {
  const { childEdit } = useContext(devContext)
  const controls = useToolKitStore(state => state.controls)
  const setControls = useToolKitStore(state => state.setControls)
  const changeVideoParam = useElementStore(state => state.changeVideoParam)

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
        {controls[0]?.type && 'type: ' + controls[0]?.type}
        <br />
        {'id: ' + Object.keys(controls)[0]}
        {Object.entries(controls).map(([id, c], i) => {
          if (c.type === 'textArea') {
            return (
              <TextArea
                autoFocus={true}
                valueAlternative={String(c.value)}
                className="w-full"
                onTextChange={(value, result) => {
                  changeVideoParam(id, { src: result })
                  setControls(
                    {
                      [id]: { ...controls[id], value },
                    },
                    true
                  )
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
