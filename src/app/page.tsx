'use client'

import SessionApp from '../molecules/SessionApp'
// import layoutContext from '../context/LayoutContent'
import WrapperDevEdit from '../organisms/WrapperDevEdit'
import useApp from '../utils/useApp'

export default function Page() {
  const { layout, handleDrop, renderRow } = useApp()

  return (
    <WrapperDevEdit>
      <SessionApp
        layout={layout}
        handleDrop={handleDrop}
        renderRow={renderRow}
      />
    </WrapperDevEdit>
  )
}
