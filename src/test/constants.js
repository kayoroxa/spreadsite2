import { uniqueId } from 'lodash'

export const SIDEBAR_ITEM = 'sidebarItem'
export const ROW = 'row'
export const COLUMN = 'column'
export const COMPONENT = 'component'

export const SIDEBAR_ITEMS = [
  {
    id: uniqueId('input_'),
    type: SIDEBAR_ITEM,
    component: {
      type: 'input',
      content: 'Some input',
    },
  },
  {
    id: uniqueId('name_'),
    type: SIDEBAR_ITEM,
    component: {
      type: 'name',
      content: 'Some name',
    },
  },
  {
    id: uniqueId('email_'),
    type: SIDEBAR_ITEM,
    component: {
      type: 'email',
      content: 'Some email',
    },
  },
  {
    id: uniqueId('phone_'),
    type: SIDEBAR_ITEM,
    component: {
      type: 'phone',
      content: 'Some phone',
    },
  },
  {
    id: uniqueId('image_'),
    type: SIDEBAR_ITEM,
    component: {
      type: 'image',
      content: 'Some image',
    },
  },
  {
    id: uniqueId('video_'),
    type: SIDEBAR_ITEM,
    component: {
      type: 'video',
      content: 'Some video',
    },
  },
]
