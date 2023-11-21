import { TextareaHTMLAttributes, useContext, useEffect, useRef } from 'react'
import dataContext from '../context/dataContext'
import useStringCode from '../utils/usehooks/useStringCode'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLDivElement> {
  onTextChange?: (raw: string, result: any) => void
  valueAlternative?: any
}

export default function TextArea(props: TextAreaProps) {
  const me = useRef<HTMLDivElement>(null)
  const errElem = useRef<HTMLDivElement>(null)
  const { dataBase } = useContext(dataContext)

  useEffect(() => {
    if (me.current) {
      me.current.textContent = props.valueAlternative

      if (props.autoFocus) {
        me.current.focus()
      }
    }
    if (errElem.current && me.current) {
      const value = me.current.textContent || ''
      const { result, error } = useStringCode(value, data)

      errElem.current.textContent =
        error || JSON.stringify(result || '')?.replace(/\\/g, '')
    }
  }, [props.valueAlternative])

  const data = dataBase[0]?.data

  return (
    <div className="w-full bg-white text-black">
      <div
        className="text-red-600 bg-yellow-200 overflow-auto whitespace-nowrap "
        ref={errElem}
      ></div>
      <div
        role="textbox"
        spellCheck="false"
        contentEditable={true}
        {...props}
        className="h-max p-2 rounded-b-3xl"
        ref={me}
        onBlur={({ target }) => {
          if (errElem.current) errElem.current.textContent = ''
          const value = target.textContent || ''
          const { result, error } = useStringCode(value, data)
          if (error && errElem.current) errElem.current.textContent = error
          else if (errElem.current)
            errElem.current.textContent = JSON.stringify(result || '')?.replace(
              /\\/g,
              ''
            )
          if (props?.onTextChange) props.onTextChange(value, result)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' && e?.currentTarget) {
            e.preventDefault()
            if (errElem.current) errElem.current.textContent = ''
            const value = e.currentTarget.textContent || ''

            const { result, error } = useStringCode(value, data)
            if (error && errElem.current) errElem.current.textContent = error
            else if (errElem.current)
              errElem.current.textContent = JSON.stringify(
                result || ''
              )?.replace(/\\/g, '')
            if (props?.onTextChange) props.onTextChange(value, result)
          }
        }}
      />
    </div>
  )
}
