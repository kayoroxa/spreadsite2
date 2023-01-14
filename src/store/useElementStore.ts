import { create } from 'zustand'
import {
  _ComponentImage,
  _ComponentInput,
  _ComponentsData,
  _ComponentVideo,
} from '../utils/@types/_Components'

interface State {
  componentsData: _ComponentsData
  // changeParams: (id: string, param: string, newValue: unknown) => void
  changeVideoParam: (id: string, changes: Partial<_ComponentVideo>) => void
  changeInputParam: (id: string, changes: Partial<_ComponentInput>) => void
  changeImgParam: (id: string, changes: Partial<_ComponentImage>) => void
}

const useElementStore = create<State>(set => ({
  componentsData: {
    videos: [],
    imgs: [],
    inputs: [],
  },
  changeVideoParam: (id, changes) => {
    return set(prev => {
      const type = 'videos'
      const newPrev = [...prev.componentsData[type]]
      const index = newPrev.findIndex(x => x.id === id)

      if (index > -1) {
        newPrev[index] = { ...newPrev[index], ...changes }
      } else {
        newPrev.push({ id, name: 'video-' + id, type: 'video', ...changes })
      }
      // return { componentsData: prev.componentsData }
      return { componentsData: { ...prev.componentsData, [type]: newPrev } }
    })
  },
  changeInputParam: (id, changes) => {
    return set(prev => {
      const type = 'inputs'
      const newPrev = [...prev.componentsData[type]]
      const index = newPrev.findIndex(x => x.id === id)
      newPrev[index] = { ...newPrev[index], ...changes }

      if (index > -1) {
        return { componentsData: { ...prev.componentsData, [type]: newPrev } }
      } else {
        return { componentsData: prev.componentsData }
      }
    })
  },
  changeImgParam: (id, changes) => {
    return set(prev => {
      const type = 'imgs'
      const newPrev = [...prev.componentsData[type]]
      const index = newPrev.findIndex(x => x.id === id)
      newPrev[index] = { ...newPrev[index], ...changes }

      if (index > -1) {
        return { componentsData: { ...prev.componentsData, [type]: newPrev } }
      } else {
        return { componentsData: prev.componentsData }
      }
    })
  },
  // changeParams: (id, param, newValue) =>
  //   set(prev => {
  //     const newPrev = { ...prev.componentsData }
  //     const entries = Object.entries(newPrev)

  //     const find = entries.reduce(
  //       (acc, cur) => {
  //         const [k, v] = cur
  //         const indexFind = v.findIndex(x => x.id === id)
  //         if (indexFind > 0) {
  //           return {
  //             category: k,
  //             index: indexFind,
  //           }
  //         } else {
  //           return acc
  //         }
  //       },
  //       {
  //         category: '',
  //         index: -1,
  //       }
  //     )

  //     newPrev.videoComponents[0]
  //     return { componentsData: newPrev }
  //   }),
}))

export default useElementStore
