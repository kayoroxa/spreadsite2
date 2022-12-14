import { useRef } from 'react'
import { useDrag } from 'react-dnd'
import { COMPONENT } from './constants'

const style = {
  border: '1px dashed black',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move',
}

interface Props {
  data: {
    id: number
  }
  components: {
    content: string
  }[]
  path: string
}

const Component = ({ data, components, path }: Props) => {
  const ref = useRef(null)

  const [{ isDragging }, drag] = useDrag<any, void, { isDragging: boolean }>({
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
      style={{ ...style, opacity }}
      className="component draggable"
    >
      <div>{data.id}</div>
      <div>{component.content}</div>
    </div>
  )
}
export default Component
