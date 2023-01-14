export type _Control = {
  id: string
  type: 'textArea' | 'input'
  value: unknown
}

export type _ControlValueObj = {
  type: 'textArea' | 'input'
  value: unknown
  elementType: 'video' | 'input' | 'image'
}

export type _Controls = {
  [id: string]: _ControlValueObj
}

export type _ControlsValues = {
  [id: string]: string
}[]
