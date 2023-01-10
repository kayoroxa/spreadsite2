'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import dataContext, { Data } from '../context/dataContext'

interface Props {
  id: string
  // setData: () => void
}

export default function ElementJS({ id }: Props) {
  const myTextArea = useRef<HTMLInputElement>(null)
  const { data, setData } = useContext(dataContext)

  const [scriptRaw, setScriptRaw] = useState('')
  const [showRaw, setShowRaw] = useState(false)
  const [scriptEval, setScriptEval] = useState('')

  useEffect(() => {
    setData((prev: Data) => ({
      ...prev,
      [id]: {
        jsEval: scriptEval,
        jsRaw: 'waiting',
      },
    }))
  }, [scriptRaw, scriptEval])

  useEffect(() => {
    try {
      // @ts-ignore: Unreachable code error
      function Get(id: string) {
        return data[id].jsEval
      }
      // async function Fetch(url: string) {
      //   const response = await fetch(url)
      //   const data = response.json()
      //   return data
      // }

      // Fetch('https://official-joke-api.appspot.com/random_joke').then(v =>
      //   console.log(v)
      // )
      const isStringIsNum = !isNaN(Number(scriptRaw))
      let raw = isStringIsNum ? Number(scriptRaw) : scriptRaw

      const evalScript = (s: string) => {
        const script = s.slice(1).replace(/(JS_\d+)/gi, 'Get("$1")')
        console.log(script)
        return eval(script)
      }

      setScriptEval(scriptRaw.startsWith('=') ? evalScript(scriptRaw) : raw)
    } catch (error) {
      setScriptEval('#N/D')
    }
    if (showRaw && myTextArea.current) myTextArea.current.focus()
  }, [showRaw, data])

  useHotkeys('enter', () => {
    setShowRaw(false)
  })

  return (
    <div>
      {/* <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your message
      </label> */}
      {!showRaw && (
        <div
          className="dark:bg-gray-700 p-2.5 hover:cursor-pointer"
          onClick={() => setShowRaw(true)}
        >
          {scriptEval || '_'}
        </div>
      )}
      {showRaw && (
        <input
          id="message"
          ref={myTextArea}
          // rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={'Seu Js Aqui... ' + id}
          // value={scriptRaw}
          onFocus={e => {
            e.currentTarget.value = scriptRaw
          }}
          onBlur={e => {
            setScriptRaw(e.currentTarget.value)
            setShowRaw(false)
          }}
          // onChange={e => setScriptRaw(e.currentTarget.value)}
          autoComplete="off"
          spellCheck={false}
          // onKeyDown={e => {
          //   if (e.currentTarget.onkeydown) {

          //     e.currentTarget.onkeydown(asdasdsad)
          //   }
          // }}
        ></input>
      )}
    </div>
  )
}
