import React, { useRef } from 'react'
import { useDrag } from 'react-dnd'
import Column from './Column'
import { ROW } from './constants'
import DropZone from './DropZone'

const style = {}
const Row = ({ data, components, handleDrop, path }) => {
  const ref = useRef(null)

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ROW,
      id: data.id,
      children: data.children,
      path,
    },
    type: ROW,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(ref)

  const renderColumn = (column, currentPath) => {
    return (
      <Column
        key={column.id}
        data={column}
        components={components}
        handleDrop={handleDrop}
        path={currentPath}
      />
    )
  }

  return (
    <div ref={ref} style={{ ...style, opacity }} className="relative  ">
      {/* <p className="absolute top-0 bg-green-200 px-3 text-xs right-0 text-black z-20 opacity-25">
        {data.id}
      </p> */}
      <div className="columns  p-2 flex">
        {data.children.map((column, index) => {
          const currentPath = `${path}-${index}`

          return (
            <React.Fragment key={column.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
                className="horizontalDrag"
              />
              {renderColumn(column, currentPath)}
            </React.Fragment>
          )
        })}
        <DropZone
          data={{
            path: `${path}-${data.children?.length}`,
            childrenCount: data.children?.length,
          }}
          onDrop={handleDrop}
          className="horizontalDrag"
          isLast
        />
      </div>
    </div>
  )
}
export default Row
