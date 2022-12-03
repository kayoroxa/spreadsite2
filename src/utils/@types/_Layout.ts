export type _Layout = {
  type: string
  id: string
  children: _Layout
}

export type _Item = {
  id: string
  type: string
  children?: any
  component?: any
  path?: string
}
