import classNames from 'classNames'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { useDrag } from 'react-dnd'
import { TbLayoutAlignMiddle, TbLayoutAlignTop } from 'react-icons/tb'
import { devContext } from '../organisms/WrapperDevEdit'
import Component from './Component'
import { COLUMN } from './constants'
import DropZone from './DropZone'

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

  const [myStyle, setMyStyle] = useState({
    justify: 'center',
  })
  const { setChildEdit } = useContext(devContext)

  const handleClickColumn = useCallback(() => {
    setChildEdit(
      <div className="flex gap-3 w-full justify-center">
        <TbLayoutAlignMiddle
          size={35}
          color={myStyle.justify === 'center' ? 'black' : 'black'}
          onClick={() => setMyStyle(prev => ({ ...prev, justify: 'center' }))}
        />

        <TbLayoutAlignTop
          size={35}
          color={myStyle.justify !== 'center' ? 'black' : 'black'}
          onClick={() => setMyStyle(prev => ({ ...prev, justify: 'start' }))}
        />
      </div>
    )
  }, [myStyle.justify])

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className={classNames(
        'hover:cursor-move bg-blue-300/40 p-1 flex flex-col flex-auto relative text-black',
        { 'justify-center': myStyle?.justify === 'center' }
      )}
      onClick={() => handleClickColumn()}
    >
      {/* <p className="absolute top-0 -mt-3 bg-green-200 px-3 text-sm opacity-25">
        {data.id}
      </p> */}
      {data.children.map((component, index) => {
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
          path: `${path}-${data.children.length}`,
          childrenCount: data.children.length,
        }}
        onDrop={handleDrop}
        isLast
      />
    </div>
  )
}
export default Column
