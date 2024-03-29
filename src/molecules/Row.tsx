import React, { useRef } from 'react'
import { useDrag } from 'react-dnd'
import { ROW } from '../utils/constants'
import DropZone from '../utils/TrashDropZone'
import Column from './Column'

const style = {}

interface Props {
  data: any
  components: any
  handleDrop: () => any
  path: string
}

const Row = ({ data, components, handleDrop, path }: Props) => {
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

  const renderColumn = (column: any, currentPath: any) => {
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
    <div ref={ref} style={{ ...style, opacity }} className="base draggable row">
      {data.id}
      <div className="columns">
        {data.children.map((column: any, index: any) => {
          const currentPath = `${path}-${index}`

          return (
            <React.Fragment key={column.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
                // className="horizontalDrag"
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
          // className="horizontalDrag"
          isLast
        />
      </div>
    </div>
  )
}
export default Row
