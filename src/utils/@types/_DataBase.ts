export interface _DataBase {
  id: string
  data: _DataLine[]
  name: string
}

export interface _DataLine {
  [k: string]: string
}
