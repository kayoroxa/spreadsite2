import React, { useRef } from 'react'
import { useDrag } from 'react-dnd'
import Component from '../utils/Component'
import { COLUMN } from '../utils/constants'
import TrashDropZone from '../utils/TrashDropZone'

const style = {}

interface Props {
  data: any
  components: any
  handleDrop: any
  path: any
}

const Column = ({ data, components, handleDrop, path }: Props) => {
  const ref = useRef(null)

  const [{ isDragging }, drag] = useDrag<any, void, { isDragging: boolean }>({
    item: {
      type: COLUMN,
      id: data.id,
      children: data.children,
      path,
    },
    type: COLUMN,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(ref)

  const renderComponent = (component: any, currentPath: any) => {
    return (
      <Component
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
      />
    )
  }

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="base draggable column"
    >
      {data.id}
      {data.children?.map((component: any, index: any) => {
        const currentPath = `${path}-${index}`

        return (
          <React.Fragment key={component.id}>
            <TrashDropZone
              data={{
                path: currentPath,
                childrenCount: data.children.length,
              }}
              onDrop={handleDrop}
            />
            {renderComponent(component, currentPath)}
          </React.Fragment>
        )
      })}
      <TrashDropZone
        data={{
          path: `${path}-${data.children?.length}`,
          childrenCount: data.children?.length,
        }}
        onDrop={handleDrop}
        isLast
      />
    </div>
  )
}
export default Column
