import { useCallback, useContext, useState } from 'react'
import {
  CiAlignCenterH,
  CiAlignCenterV,
  CiAlignLeft,
  CiAlignTop,
} from 'react-icons/ci'
import { devContext } from '../organisms/WrapperDevEdit'

interface MyStyle {
  justify: 'center' | 'start'
  items: 'center' | 'start'
}

export default function useComponent() {
  const { setChildEdit } = useContext(devContext)
  const [myStyle, setMyStyle] = useState<MyStyle>({
    justify: 'center',
    items: 'center',
  })

  const handleClickColumn = useCallback(() => {
    setChildEdit(
      <div className="flex flex-col gap-3 w-full justify-center">
        <div className="flex gap-3">
          <CiAlignTop
            size={35}
            className="hover:cursor-pointer hover:bg-purple-400"
            color={myStyle.justify !== 'center' ? 'black' : 'black'}
            onClick={() => setMyStyle(prev => ({ ...prev, justify: 'start' }))}
          />

          <CiAlignCenterV
            size={35}
            className="hover:cursor-pointer hover:bg-purple-400"
            color={myStyle.justify !== 'center' ? 'black' : 'black'}
            onClick={() => setMyStyle(prev => ({ ...prev, justify: 'center' }))}
          />
        </div>
        <div className="flex gap-3">
          <CiAlignLeft
            size={35}
            className="hover:cursor-pointer hover:bg-purple-400"
            color={myStyle.justify !== 'center' ? 'black' : 'black'}
            onClick={() => setMyStyle(prev => ({ ...prev, items: 'start' }))}
          />
          <CiAlignCenterH
            size={35}
            className="hover:cursor-pointer hover:bg-purple-400"
            color={myStyle.justify === 'center' ? 'black' : 'black'}
            onClick={() => setMyStyle(prev => ({ ...prev, items: 'center' }))}
          />
        </div>
      </div>
    )
  }, [myStyle])

  return {
    putEditParamsOnSideBar: handleClickColumn,
    myStyle,
  }
}
