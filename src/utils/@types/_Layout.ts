export type _Layout = {
  type: string
  id: string
  children?: _Layout
}[]

export type _LayoutApp = {
  layout: _Layout
  components: {
    [k: string]: { id: string; type: string; content: string }
  }
}

export type _Item = {
  id: string
  type: string
  children?: any
  component?: any
  path?: string
}
