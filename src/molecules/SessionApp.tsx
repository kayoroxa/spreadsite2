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
    <div className="flex flex-col min-h-full">
      {layout.map((row, index) => {
        const currentPath = `${index}`

        return (
          <Fragment key={row.id}>
            <DropZone
              small={true}
              data={{
                path: currentPath,
                childrenCount: layout.length,
              }}
              onDrop={handleDrop}
              isLast={false}
              className="bg-zinc-900"
            />
            {renderRow(row, currentPath)}
          </Fragment>
        )
      })}
      <DropZone
        small={false}
        data={{
          path: `${layout.length}`,
          childrenCount: layout.length,
        }}
        onDrop={handleDrop}
        isLast
        className=""
      />
      {layout.length === 0 && (
        <div className="absolute">
          esperando sua boa vontade de arrastar um element para aqui
        </div>
      )}
    </div>
  )
}
