import { Dispatch, SetStateAction } from 'react'
import { create } from 'zustand'
import { _Controls } from '../utils/@types/_DevEdit'

type EditionMode = 'edit' | 'add' | 'db' | false

interface State {
  controls: _Controls
  setControls: (newControls: _Controls, force?: boolean) => void
  putElementIdSelected: (id: string) => void
  elementIdSelected: string | false
  editionMode: EditionMode
  putEditionMode: Dispatch<SetStateAction<EditionMode>>
}

const useToolKitStore = create<State>(set => ({
  controls: {} as _Controls,
  setControls: (newControls, force) => {
    const id = Object.keys(newControls)[0]
    set(prevState => {
      const hasId = Object.keys(prevState.controls).includes(id)
      if (hasId && !force) return { controls: prevState.controls }

      return {
        controls: newControls,
      }
    })
  },
  elementIdSelected: false,
  putElementIdSelected: id => {
    set(() => ({
      elementIdSelected: id,
    }))
  },
  editionMode: 'add',
  putEditionMode: callBack => {
    set(prevStore => ({
      editionMode:
        typeof callBack === 'function'
          ? callBack(prevStore.editionMode)
          : callBack,
    }))
  },
}))

export default useToolKitStore
