'use client'

import { Fragment } from 'react'
// import layoutContext from '../context/LayoutContent'
import WrapperDevEdit from '../organisms/WrapperDevEdit'
import DropZone from '../test/DropZone'
import useApp from '../utils/useApp'

export default function Page() {
  const { layout, handleDrop, renderRow } = useApp()

  return (
    <WrapperDevEdit>
      <div className="flex flex-col">
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
