import { useRef } from 'react'
import { useDrag } from 'react-dnd'
import ElementJS from '../molecules/ElementJS'
import { COMPONENT } from './constants'

const style = {
  border: '1px dashed black',
  padding: '0.5rem 1rem',
  // backgroundColor: 'white',
  cursor: 'move',
}

function Content({ component }) {
  if (component.type === 'input') {
    debugger
    return <ElementJS id={`js_${component.id.match(/\d+/)[0]}`} />
  }
  if (component.type === 'image') {
    return (
      <div className="w-full flex-1 flex">
        <img
          className="w-[50px] flex-auto"
          src="https://services.meteored.com/img/article/telescopio-webb-capta-con-muy-alta-resolucion-a-los-pilares-de-la-creacion-1667393426739_768.png"
          alt=""
        />
      </div>
    )
  }
  return (
    <div className="h-8 bg-zinc-600 text-zinc-200">{component.content}</div>
  )
}

const Component = ({ data, components, path }) => {
  const ref = useRef(null)

  const [{ isDragging }, drag] = useDrag({
    item: { type: COMPONENT, id: data.id, path },

    type: COMPONENT,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(ref)

  const component = components[data.id]

  return (
    <div
      ref={ref}
      // style={{ ...style, opacity }}
      className="bg-zinc-700/20 relative "
    >
      {/* <p className=" absolute top-0 bg-green-200 px-3 text-xs right-0 opacity-25">
        {data.id}
      </p> */}
      <div className="w-full">
        <Content component={component} />
      </div>
    </div>
  )
}
export default Component
