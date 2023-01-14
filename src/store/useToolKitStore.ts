import { create } from 'zustand'
import { _Controls } from '../utils/@types/_DevEdit'

interface State {
  controls: _Controls
  setControls: (newControls: _Controls) => void
}

const useToolKitStore = create<State>(set => ({
  controls: {
    ['123456']: {
      type: 'textArea',
      value: '123456' + JSON.stringify('src', null, 2),
    },
  } as _Controls,
  setControls: newControls => {
    set(() => ({
      controls: newControls,
    }))
  },
}))

export default useToolKitStore
