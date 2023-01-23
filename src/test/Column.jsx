import classNames from 'classNames'
import React, { useRef } from 'react'
import { useDrag } from 'react-dnd'
import { AiOutlineDrag } from 'react-icons/ai'
import Component from './Component'
import { COLUMN } from './constants'
import DropZone from './DropZone'
import useColumn from './UseColumn'

const style = {}
const Column = ({ data, components, handleDrop, path }) => {
  const ref = useRef(null)

  const [{ isDragging }, drag] = useDrag({
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

  const renderComponent = (component, currentPath) => {
    return (
      <Component
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
      />
    )
  }

  const { myStyle, putEditParamsOnSideBar } = useColumn()

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className={classNames(
        ' bg-green-300/40 p-1 pt-3 flex flex-col flex-auto relative text-black basis-full',
        { 'justify-center': myStyle?.justify === 'center' },
        { 'items-center': myStyle?.items === 'center' }
      )}
      onClick={() => putEditParamsOnSideBar()}
    >
      <div className="absolute bg-zinc-900 z-40 left-0 w-max px-3 text-zinc-100  flex gap-2 label ">
        <AiOutlineDrag size={20} className="hover:cursor-pointer icon" />
      </div>

      {/* <p className="absolute top-0 -mt-3 bg-green-200 px-3 text-sm opacity-25">
        {data.id}
      </p> */}
      <DropZone
        data={{
          path: `${path}-${data.children?.length}`,
          childrenCount: data.children?.length,
        }}
        onDrop={handleDrop}
      />
      {data.children?.map((component, index) => {
        const currentPath = `${path}-${index}`

        return (
          <React.Fragment key={component.id}>
            <DropZone
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
      <DropZone
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
