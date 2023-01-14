import { TextareaHTMLAttributes, useEffect, useRef } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onTextChange?: (value: string) => void
  valueAlternative?: any
}

export default function TextArea(props: TextAreaProps) {
  const me = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (me.current) {
      me.current.value = props.valueAlternative
    }
  }, [props.valueAlternative])

  return (
    <textarea
      {...props}
      ref={me}
      onBlur={({ target }) => {
        const value = target.value
        if (props?.onTextChange) props.onTextChange(value)
      }}
      onKeyDown={e => {
        if (e.key === 'Enter' && e?.currentTarget?.value) {
          e.preventDefault()
          const value = e.currentTarget.value
          if (props?.onTextChange) props.onTextChange(value)
        }
      }}
    />
  )
}
