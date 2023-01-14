'use client'

import { useContext } from 'react'
import { FaDatabase } from 'react-icons/fa'
import { IoMdAddCircle } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import { devContext } from '../organisms/WrapperDevEdit'

import SideBarItem from '../test/SideBarItem'
import { SIDEBAR_ITEMS } from '../utils/constants'
import Edit from './Edit'

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

export default function DevSideTools({}: any) {
  const { editionMode, setEditionMode } = useContext(devContext)

  return (
    <div className="h-screen bg-purple-800 flex">
      <section className="flex flex-col gap-4 p-4">
        <div
          onClick={() =>
            setEditionMode(prev => (prev === 'add' ? false : 'add'))
          }
          className={'hover:cursor-pointer'}
        >
          <IoMdAddCircle
            size={30}
            color={editionMode === 'add' ? 'rgb(59 130 246)' : undefined}
          />
          Add
        </div>
        <div
          onClick={() =>
            setEditionMode(prev => (prev === 'edit' ? false : 'edit'))
          }
          className="hover:cursor-pointer"
        >
          <MdEdit
            size={30}
            color={editionMode === 'edit' ? 'rgb(59 130 246)' : undefined}
          />
          Edit
        </div>
        <div
          onClick={() => setEditionMode(prev => (prev === 'db' ? false : 'db'))}
          className="hover:cursor-pointer"
        >
          <FaDatabase
            size={30}
            color={editionMode === 'db' ? 'rgb(59 130 246)' : undefined}
          />
          DB
        </div>
      </section>
      {editionMode === 'add' && <Add />}
      {editionMode === 'edit' && <Edit />}
    </div>
  )
}
