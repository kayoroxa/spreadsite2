import { useCallback, useContext, useRef, useState } from 'react'
import {
  CiAlignCenterH,
  CiAlignCenterV,
  CiAlignLeft,
  CiAlignTop,
} from 'react-icons/ci'
import { devContext } from '../organisms/WrapperDevEdit'

interface MyStyle {
  justify: 'center' | 'start' | 'initial'
  items: 'center' | 'start' | 'initial'
  width?: number
}

function InputRange({ _ref, setMyStyle, myStyle }: any) {
  const [value, setValue] = useState(myStyle?.width || 100)
  return (
    <>
      <label
        // for="minmax-range"
        className="block mb-2 text-sm font-medium"
      >
        Width
      </label>
      <input
        id="minmax-range"
        type="range"
        ref={_ref}
        min="5"
        step="5"
        max="100"
        onChange={e => {
          setValue(Number(e.target.value))
          setMyStyle((prev: MyStyle) => ({
            ...prev,
            width: Number(e.target.value),
          }))
        }}
        value={value}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </>
  )
}

export default function useComponent() {
  const { setChildEdit } = useContext(devContext)
  const [myStyle, setMyStyle] = useState<MyStyle>({
    justify: 'initial',
    items: 'initial',
  })
  const widthRef = useRef<HTMLInputElement>(null)

  const handleClickColumn = useCallback(() => {
    setChildEdit(
      <div className="flex self flex-col gap-3 w-full justify-center text-black">
        COMPONENT
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
        <div>
          <InputRange
            _ref={widthRef}
            setMyStyle={setMyStyle}
            myStyle={myStyle}
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
