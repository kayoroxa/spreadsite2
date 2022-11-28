'use client'

import { useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

interface Props {}

export default function ElementJS(params: Props) {
  const myTextArea = useRef<HTMLTextAreaElement>(null)

  const [scriptRaw, setScriptRaw] = useState('')

  const [showRaw, setShowRaw] = useState(false)
  const [scriptEval, setScriptEval] = useState('')

  useEffect(() => {
    try {
      setScriptEval(
        scriptRaw.startsWith('=') ? eval(scriptRaw.slice(1)) : scriptRaw
      )
    } catch (error) {
      setScriptEval('error')
    }
    if (showRaw && myTextArea.current) myTextArea.current.focus()
  }, [showRaw])

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
        <div className="dark:bg-gray-700 p-5" onClick={() => setShowRaw(true)}>
          {scriptEval || 'nada'}
        </div>
      )}
      {showRaw && (
        <textarea
          id="message"
          ref={myTextArea}
          // rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Seu Js Aqui..."
          value={scriptRaw}
          onBlur={() => setShowRaw(false)}
          onChange={e => setScriptRaw(e.currentTarget.value)}
        ></textarea>
      )}
    </div>
  )
}
