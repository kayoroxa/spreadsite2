import classNames from 'classnames'
import { useContext, useRef } from 'react'
import { useDrag } from 'react-dnd'
import { AiOutlineDrag } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import dataContext from '../context/dataContext'
import ElementButton from '../molecules/ElementButton'
import ElementJS from '../molecules/ElementJS'
import ElementTable from '../molecules/ElementTable'
import Image from '../molecules/Image'
import Video from '../molecules/Video'
import useToolKitStore from '../store/useToolKitStore'
import { COMPONENT } from './constants'
import useComponent from './UseComponent'

function Content({ component }) {
  const { dataBase } = useContext(dataContext)

  if (!component?.type) return <div></div>
  if (component.type === 'input') {
    return <ElementJS id={`js_${component.id.match(/\d+/)[0]}`} />
  }
  if (component.type === 'image') {
    return <Image id={component.id} />
  }
  if (component.type === 'video') {
    return <Video id={component.id} />
  }
  if (component.type === 'phone') {
    return <ElementButton name="Click Aqui" />
  }

  if (component.type === 'table') {
    return <ElementTable id={component.id} />
  }
  return (
    <div className="h-8 bg-zinc-600 text-zinc-200">{component.content}</div>
  )
}

const Component = ({ data, components, path }) => {
  const ref = useRef(null)

  const [{ isDragging }, drag] = useDrag({
    item: { type: COMPONENT, id: data.id, path },

    type: COMPONENT,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(ref)

  const component = components[data.id]

  const { myStyle, putEditParamsOnSideBar } = useComponent()

  const putElementIdSelected = useToolKitStore(
    store => store.putElementIdSelected
  )
  const putEditionMode = useToolKitStore(store => store.putEditionMode)

  return (
    <div
      ref={ref}
      // style={{ ...style, opacity }}
      style={{ width: myStyle?.width + '%' }}
      className={classNames(
        'bg-zinc-700/20 relative w-full p-1',
        { 'justify-self-center': myStyle?.justify === 'center' },
        { 'self-center': myStyle?.items === 'center' }
      )}
      onClick={e => {
        e.stopPropagation()
        putElementIdSelected(component.id)
        putEditParamsOnSideBar()
      }}
    >
      {component?.type && (
        <div className="absolute bg-zinc-900 z-40 left-0 w-max px-3 text-zinc-100  flex gap-2 label ">
          <AiOutlineDrag size={20} className="hover:cursor-pointer icon" />
          <FiEdit
            size={20}
            className="hover:cursor-pointer icon"
            onClick={e => {
              e.stopPropagation()
              putElementIdSelected(component.id)
              putEditionMode('edit')
              putEditParamsOnSideBar()
            }}
          />
        </div>
      )}
      {/* <p className=" absolute top-0 bg-green-200 px-3 text-xs right-0 opacity-25">
        {data.id}
      </p> */}
      <div className={classNames('w-full')}>
        <Content component={component} />
      </div>
    </div>
  )
}
export default Component
