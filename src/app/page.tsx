'use client'

import { uniqueId } from 'lodash'
import { Fragment, useCallback, useState } from 'react'
// import layoutContext from '../context/LayoutContent'
import WrapperDevEdit from '../organisms/WrapperDevEdit'
import DropZone from '../test/DropZone'
import {
  handleMoveSidebarComponentIntoParent,
  handleMoveToDifferentParent,
  handleMoveWithinParent,
} from '../test/helpers'
import initialData from '../test/initial-data'
import Row from '../test/Row'
import { _Item } from '../utils/@types/_Layout'
import { COLUMN, COMPONENT, SIDEBAR_ITEM } from '../utils/constants'

export default function Page() {
  // const { layout, setLayout } = useContext(layoutContext)

  const initialLayout = initialData.layout
  const initialComponents = initialData.components
  const [layout, setLayout] = useState(initialLayout)
  const [components, setComponents] = useState(initialComponents)

  const handleDrop = useCallback(
    (dropZone: any, item: _Item) => {
      console.log('dropZone', dropZone)
      console.log('item', item)

      const splitDropZonePath = dropZone.path.split('-')
      const pathToDropZone = splitDropZonePath.slice(0, -1).join('-')

      const newItem: _Item = { id: item.id, type: item.type }
      if (item.type === COLUMN) {
        newItem.children = item.children
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: uniqueId('component_'),
          ...item.component,
        }
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
        }
        setComponents({
          ...components,
          [newComponent.id]: newComponent,
        })
        setLayout(
          handleMoveSidebarComponentIntoParent(
            layout,
            splitDropZonePath,
            newItem
          )
        )
        return
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item?.path?.split('-')
      const pathToItem = splitItemPath?.slice(0, -1).join('-')

      // 2. Pure move (no create)
      if (splitItemPath?.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          )
          return
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        )
        return
      }

      // 3. Move + Create
      setLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      )
    },
    [layout, components]
  )

  const renderRow = (row: any, currentPath: string) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
      />
    )
  }

  return (
    <WrapperDevEdit>
      <div className="flex flex-col">
        {/* {Array(5)
          .fill(false)
          .map((_, id) => (
            <ElementJS id={`js_${id}`} />
          ))} */}
        {/* {layout.map(l => l.Element)} */}
        {/* <DropZone
          data={{
            path: '1',
            childrenCount: layout.length,
          }}
          onDrop={handleDrop}
          isLast={true}
          className=""
          // path={"1"}
        />
        {renderRow(row, currentPath)} */}

        {layout.map((row, index) => {
          const currentPath = `${index}`

          return (
            <Fragment key={row.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: layout.length,
                }}
                onDrop={handleDrop}
                isLast={false}
                className=""
              />
              {renderRow(row, currentPath)}
            </Fragment>
          )
        })}
        <DropZone
          data={{
            path: `${layout.length}`,
            childrenCount: layout.length,
          }}
          onDrop={handleDrop}
          isLast
          className=""
        />
      </div>
    </WrapperDevEdit>
  )
}
