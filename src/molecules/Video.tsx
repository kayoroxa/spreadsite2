import { useCallback, useEffect, useMemo, useState } from 'react'
import useElementStore from '../store/useElementStore'
import useToolKitStore from '../store/useToolKitStore'
import { _Controls } from '../utils/@types/_DevEdit'

export default function Video({ id }: { id: string }) {
  // const { controls } = useContext(devContext)
  const [isFocus, setIsFocus] = useState(false)
  const [isViewer, setIsViewer] = useState(true)

  const mudar = useToolKitStore(state => state.setControls)
  const elementIdSelected = useToolKitStore(state => state.elementIdSelected)
  const videos = useElementStore(state => state.componentsData.videos)

  const myInfo = useMemo(() => {
    return videos.find(v => v.id === id)
  }, [videos])

  const set = useCallback(() => {
    const config: _Controls = {
      [id]: {
        type: 'textArea',
        elementType: 'video',
        value: myInfo?.src || '',
      },
    }
    mudar(config)
  }, [])

  useEffect(() => {
    if (elementIdSelected === id) set()
  }, [elementIdSelected])

  return (
    <div
      className="w-full flex-1 flex"
      onClick={set}
      onBlur={() => setIsFocus(false)}
    >
      {/* <div>{myInfo?.src || 's'}</div> */}
      {isViewer && (
        <div className="relative pb-[56.25%] h-0 w-full">
          <iframe
            className="top-0 left-0 absolute w-full h-full"
            src={`https://www.youtube.com/embed/${
              myInfo?.src || 'S-LcW_jy-e8'
            }`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          ></iframe>
        </div>
      )}

      {!isViewer && (
        <div className="relative pb-[56.25%] h-0 w-full flex">
          <div>video - id: {id}</div>
        </div>
      )}
    </div>
  )
}
