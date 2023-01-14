import { useCallback, useEffect, useMemo, useState } from 'react'
import useElementStore from '../store/useElementStore'
import useToolKitStore from '../store/useToolKitStore'
import { _Controls } from '../utils/@types/_DevEdit'

export default function Image({ id }: { id: string }) {
  // const { controls } = useContext(devContext)
  const [isFocus, setIsFocus] = useState(false)
  const [isViewer, setIsViewer] = useState(true)

  const mudar = useToolKitStore(state => state.setControls)
  const elementIdSelected = useToolKitStore(state => state.elementIdSelected)
  const imgs = useElementStore(state => state.componentsData.imgs)
  const all = useElementStore(state => state.componentsData)

  const myInfo = useMemo(() => {
    return imgs.find(v => v.id === id)
  }, [imgs])

  const set = useCallback(() => {
    const config: _Controls = {
      [id]: {
        type: 'textArea',
        elementType: 'image',
        value: myInfo?.src || '',
      },
    }
    mudar(config)
  }, [])

  useEffect(() => {
    if (elementIdSelected === id) set()
  }, [elementIdSelected])

  return (
    <div className="w-full flex-1 flex" onClick={set}>
      {/* <div>{JSON.stringify(all)}</div> */}
      {isViewer && (
        <div className="w-full flex-1 flex">
          <img
            className="w-[50px] min-h-[60px] flex-auto"
            src={
              myInfo?.src ||
              'https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg'
            }
            alt=""
          />
        </div>
      )}

      {!isViewer && (
        <div className="relative pb-[56.25%] h-0 w-full flex">
          <div>Image - id: {id}</div>
        </div>
      )}
    </div>
  )
}
