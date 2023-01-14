import SessionApp from '../molecules/SessionApp'
import SessionDB from '../molecules/SessionDB'
// import layoutContext from '../context/LayoutContent'
import WrapperDevEdit from '../organisms/WrapperDevEdit'
import useToolKitStore from '../store/useToolKitStore'
import useApp from '../utils/useApp'

function Main() {
  const editionMode = useToolKitStore(store => store.editionMode)
  const { layout, handleDrop, renderRow } = useApp()
  return (
    <>
      {editionMode === 'db' && <SessionDB />}
      {editionMode !== 'db' && (
        <SessionApp
          layout={layout}
          handleDrop={handleDrop}
          renderRow={renderRow}
        />
      )}
    </>
  )
}

export default function PageEdition() {
  return (
    <WrapperDevEdit>
      <Main />
    </WrapperDevEdit>
  )
}
