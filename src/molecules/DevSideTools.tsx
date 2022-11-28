'use client'

import { useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'

function Card() {
  return (
    <div className="bg-zinc-200 w-72 flex flex-col justify-center items-center rounded-lg p-2 text-zinc-700 flex-1">
      <IoMdAddCircle size={20} />
      <p>Hello</p>
    </div>
  )
}

export default function DevSideTools() {
  const [show, setShow] = useState(false)
  return (
    <div className="h-screen bg-purple-800 flex">
      <section className="flex flex-col gap-4 p-4">
        <div onClick={() => setShow(prev => !prev)}>
          <IoMdAddCircle size={30} />
          text
        </div>
        <div onClick={() => setShow(prev => !prev)}>
          <IoMdAddCircle size={30} />
          text
        </div>
        <div onClick={() => setShow(prev => !prev)}>
          <IoMdAddCircle size={30} />
          text
        </div>
      </section>
      {show && (
        <section className="w-[20vw] bg-zinc-300 flex p-6 gap-4 justify-center items-start">
          <div className="flex flex-wrap gap-4 w-full">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </section>
      )}
    </div>
  )
}
