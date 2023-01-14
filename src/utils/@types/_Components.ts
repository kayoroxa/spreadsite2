interface Component {
  id: string
  name: string
}

export interface _ComponentVideo extends Component {
  src?: string
  type: 'video'
}

export interface _ComponentImage extends Component {
  src?: string
  type: 'image'
}

export interface _ComponentInput extends Component {
  rawCode: string
  executedCode: string
  type: 'input'
}

export type _ComponentsData = {
  videos: _ComponentVideo[]
  imgs: _ComponentImage[]
  inputs: _ComponentInput[]
}
