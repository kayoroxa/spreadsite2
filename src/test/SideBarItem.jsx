'use client'
import { useDrag } from 'react-dnd'

const SideBarItem = ({ data }) => {
  const [{ opacity }, drag] = useDrag({
    item: data,
    type: data.type,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })

  return (
    <div
      className="bg-zinc-200 w-72 flex flex-col justify-center items-center rounded-lg p-2 text-zinc-700 flex-1 hover:cursor-move hover:text-blue-500"
      ref={drag}
      style={{ opacity }}
    >
      {data.component.type}
    </div>
  )
}
export default SideBarItem
