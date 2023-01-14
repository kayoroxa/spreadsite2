import { uniqueId } from 'lodash'
import { useCallback, useState } from 'react'
// import layoutContext from '../context/LayoutContent'
import {
  handleMoveSidebarComponentIntoParent,
  handleMoveToDifferentParent,
  handleMoveWithinParent,
} from '../test/helpers'
import initialData from '../test/initial-data'
import Row from '../test/Row'
import { _Item } from './@types/_Layout'
import { COLUMN, COMPONENT, SIDEBAR_ITEM } from './constants'

export default function useApp() {
  // const { layout, setLayout } = useContext(layoutContext)

  const initialLayout = initialData.layout
  const initialComponents = initialData.components
  const [layout, setLayout] = useState(initialLayout)
  const [components, setComponents] = useState(initialComponents)

  const handleDrop = useCallback(
    (dropZone: any, item: _Item) => {
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

  return {
    renderRow,
    layout,
    handleDrop,
  }
}
