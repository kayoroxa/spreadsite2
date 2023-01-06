'use client'

import { useContext, useState } from 'react'
import { useDrag } from 'react-dnd'
import { IoMdAddCircle } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import layoutContext from '../context/LayoutContent'
import { devContext } from '../organisms/WrapperDevEdit'
import SideBarItem from '../test/SideBarItem'
import { SIDEBAR_ITEMS } from '../utils/constants'
import ElementButton from './ElementButton'
import ElementJS from './ElementJS'

function Card({ type }: { type: 'js' | 'button' }) {
  const { setLayout } = useContext(layoutContext)

  return (
    <div
      className="bg-zinc-200 w-72 flex flex-col justify-center items-center rounded-lg p-2 text-zinc-700 flex-1 hover:cursor-pointer hover:text-blue-500"
      onClick={() => {
        setLayout(prev => {
          if (type === 'js') {
            return [
              ...prev,
              {
                id: 'id',
                key: prev.length + 1,
                Element: <ElementJS id={'js_' + (prev.length + 1)} />,
              },
            ]
          } else {
            return [
              ...prev,
              {
                id: 'id',
                key: prev.length + 1,
                Element: <ElementButton name={String(prev.length + 1)} />,
              },
            ]
          }
        })
      }}
    >
      <IoMdAddCircle size={20} />
      <p>{type}</p>
    </div>
  )
}

function Edit() {
  const { childEdit, controls, setControls } = useContext(devContext)
  return (
    <section className="w-[20vw] bg-zinc-300 flex flex-col  items-start ">
      <header className="w-full flex gap-2 p-2 py-4 bg-zinc-600">
        <div className="flex-1   bg-zinc-300/80 text-black text-center px-4 py-2 rounded-lg hover:cursor-pointer">
          CSS
        </div>
        <div className="flex-1 bg-zinc-300/80 text-black text-center px-4 py-2 rounded-lg hover:cursor-pointer">
          Child
        </div>
        <div className="flex-1 bg-zinc-300/80 text-black text-center px-4 py-2 rounded-lg hover:cursor-pointer">
          DB
        </div>
      </header>
      <div className="flex flex-wrap gap-4 w-full p-6 ">{childEdit}</div>
      <div className="flex flex-wrap gap-4 w-full p-6 text-black">
        {Object.entries(controls).map(([id, c]) => {
          if (c.type === 'textArea') {
            return (
              <textarea
                defaultValue={String(c.value)}
                className="w-full h-96"
                onBlur={({ target }) =>
                  setControls(prev => ({
                    ...prev,
                    [id]: { ...controls[id], value: target.value },
                  }))
                }
              />
            )
          }
          return <input />
        })}
      </div>
    </section>
  )
}

function Add() {
  return (
    <section className="w-[20vw] bg-zinc-300 flex p-6 gap-4 justify-center items-start">
      <div className="flex flex-wrap gap-4 w-full">
        {/* <Card type="js" />
        <Card type="button" /> */}
        {Object.values(SIDEBAR_ITEMS).map(sideBarItem => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
      </div>
    </section>
  )
}

export default function DevSideTools({ data }: any) {
  const [show, setShow] = useState<'edit' | 'add' | false>('edit')

  const [{ opacity }, drag] = useDrag({
    item: data,
    type: 'a',
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })

  return (
    <div className="h-screen bg-purple-800 flex">
      <section className="flex flex-col gap-4 p-4">
        <div
          onClick={() => setShow(prev => (prev === 'add' ? false : 'add'))}
          className={'hover:cursor-pointer'}
        >
          <IoMdAddCircle
            size={30}
            color={show === 'add' ? 'rgb(59 130 246)' : undefined}
          />
          Add
        </div>
        <div
          onClick={() => setShow(prev => (prev === 'edit' ? false : 'edit'))}
          className="hover:cursor-pointer"
        >
          <MdEdit
            size={30}
            color={show === 'edit' ? 'rgb(59 130 246)' : undefined}
          />
          Edit
        </div>
      </section>
      {show === 'add' && <Add />}
      {show === 'edit' && <Edit />}
    </div>
  )
}
