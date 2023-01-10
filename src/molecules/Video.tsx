import { useContext, useEffect, useState } from 'react'
import { devContext } from '../organisms/WrapperDevEdit'

export default function Video({ id }: { id: string }) {
  const { setControls } = useContext(devContext)
  const [src, setSrc] = useState('S-LcW_jy-e8')

  useEffect(() => {
    setControls({
      [id]: {
        type: 'textArea',
        value: JSON.stringify(src, null, 2),
      },
    })
  }, [])

  return (
    <div className="w-full flex-1 flex">
      <div className="relative pb-[56.25%] h-0 w-full">
        <iframe
          className="top-0 left-0 absolute w-full h-full"
          src={`https://www.youtube.com/embed/${src}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  )
}
