import { useRef } from 'react'
import { useDrag } from 'react-dnd'
import { COMPONENT } from './constants'

const style = {
  border: '1px dashed black',
  padding: '0.5rem 1rem',
  // backgroundColor: 'white',
  cursor: 'move',
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
      className=" draggable bg-zinc-700/20 text-black relative"
    >
      <p className="absolute top-0 bg-green-200 px-3 text-xs right-0">
        {data.id}
      </p>
      <div>{component.content}</div>
    </div>
  )
}
export default Component
