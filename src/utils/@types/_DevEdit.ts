export type _Control = {
  id: string
  type: 'textArea' | 'input'
  value: unknown
}

export type _Controls = {
  [id: string]: { type: 'textArea' | 'input'; value: unknown }
}

export type _ControlsValues = {
  [id: string]: string
}[]
