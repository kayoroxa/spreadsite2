import { Fragment } from 'react'
import DropZone from '../test/DropZone'
import { _Item, _Layout } from '../utils/@types/_Layout'

interface IProps {
  handleDrop: (dropZone: any, item: _Item) => void
  renderRow: (row: any, currentPath: string) => JSX.Element
  layout: _Layout
}

export default function SessionApp({ handleDrop, renderRow, layout }: IProps) {
  return (
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
  )
}
