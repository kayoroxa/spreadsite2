import { useContext } from 'react'
import TextArea from '../atoms/TextArea'
import { devContext } from '../organisms/WrapperDevEdit'
import useElementStore from '../store/useElementStore'
import useToolKitStore from '../store/useToolKitStore'
import { _ControlValueObj } from '../utils/@types/_DevEdit'

function MyControls({ id, values }: { id: string; values: _ControlValueObj }) {
  const setControls = useToolKitStore(state => state.setControls)
  const changeVideoParam = useElementStore(state => state.changeVideoParam)
  const changeImgParam = useElementStore(state => state.changeImgParam)
  const controls = useToolKitStore(state => state.controls)

  if (values.type === 'textArea') {
    return (
      <TextArea
        autoFocus={true}
        valueAlternative={String(values.value)}
        className="w-full"
        onTextChange={(value, result) => {
          console.log({ values })
          if (values.elementType === 'video') {
            changeVideoParam(id, { src: result })
          } else {
            changeImgParam(id, { src: result })
          }
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
}

export default function Edit() {
  const { childEdit } = useContext(devContext)
  const controls = useToolKitStore(state => state.controls)

  const elementIdSelected = useToolKitStore(state => state.elementIdSelected)

  const selectedProps =
    elementIdSelected && controls[elementIdSelected]
      ? controls[elementIdSelected]
      : false

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
        {/* {selectedProps && selectedProps?.type && 'type: ' + controls[0]?.type} */}
        <br />
        {elementIdSelected
          ? 'id: ' + elementIdSelected
          : 'Selecione 1 elemento...'}

        {selectedProps && elementIdSelected && (
          <MyControls
            id={elementIdSelected}
            values={controls[elementIdSelected]}
          />
        )}
        {/* {Object.entries(controls).map(([id, c], i) => {
          
        })} */}
      </div>
    </section>
  )
}
