import { useContext, useEffect, useRef, useState } from 'react'
import dataContext from '../context/dataContext'
import initial from '../utils/mock-data.json'

function Button({ text, onClick }: { text: string; onClick?: () => any }) {
  return (
    <button
      onClick={onClick}
      className="bg-zinc-600 hover:bg-zinc-500 text-white-800 font-bold py-2 px-4 rounded"
    >
      {text}
    </button>
  )
}

function Table({ dbID }: { dbID: string }) {
  const { dataBase, setDataBase } = useContext(dataContext)

  useEffect(() => {
    const myDataBase = dataBase.find(v => v.id === dbID)
    if (!myDataBase) {
      setDataBase(prev => {
        const newPrev = [...prev]
        newPrev.push({ id: dbID, name: 'tabela nutricional', data: initial })
        return newPrev
      })
    }
  }, [])

  function handleEdit(lineIndex: number, category: string, value: string) {
    setDataBase(prev => {
      const newPrev = [...prev]
      const index = newPrev.findIndex(v => v.id === dbID)
      newPrev[index].data[lineIndex][category] = value

      return newPrev
    })
  }

  const data = dataBase[0]?.data

  if (!data) return <div>loading</div>

  return (
    <div>
      <table className="table table-auto max-w-full overflow-auto">
        <thead>
          <tr>
            {Object.keys(data[0]).map(v => (
              <th className="text-xl">{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((line, lineIndex) => (
            <tr>
              {Object.entries(line).map(([category, value], i) => (
                <td
                  key={i}
                  className="text-xl"
                  contentEditable={true}
                  onBlur={({ target }) =>
                    handleEdit(lineIndex, category, target?.textContent || '')
                  }
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleEdit(
                        lineIndex,
                        category,
                        e.currentTarget.textContent || ''
                      )
                      e.currentTarget.blur()
                    }
                  }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div>{JSON.stringify(dataBase[0])}</div> */}
    </div>
  )
}

export default function SessionDB() {
  const { setDataBase } = useContext(dataContext)
  const [tableId, setTableId] = useState('784')

  function handleNewCategory(categoryName: string) {
    setDataBase(prev => {
      const newPrev = [...prev]
      const index = newPrev.findIndex(v => v.id === tableId)
      newPrev[index].data = newPrev[index].data.map(line => ({
        ...line,
        [categoryName]: '',
      }))
      return newPrev
    })
  }

  const handleAddLine = () => {
    setDataBase(prev => {
      const newPrev = [...prev]
      const index = newPrev.findIndex(v => v.id === tableId)
      const last = newPrev[index].data.slice(-1)[0]
      if (Object.values(last)[0] !== '') {
        const keys = Object.keys(newPrev[index].data[0])
        const entries = keys.map(k => [k, ''])

        newPrev[index].data.push(Object.fromEntries(entries))
      }
      return newPrev
    })
  }
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <header className="flex w-full items-center  gap-5 py-2 px-4">
        <div>
          Database: <strong>Tabela nutricional</strong>
        </div>
        <div className="ml-auto flex gap-5">
          <Button
            onClick={() => {
              handleAddLine()
            }}
            text="new line"
          />

          <input
            ref={inputRef}
            className="bg-zinc-900"
            type="text"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleNewCategory(e.currentTarget.value)
                e.currentTarget.value = ''
              }
            }}
          />
          <Button
            text="Add category"
            onClick={() => {
              const value = inputRef.current?.value
              if (value) {
                handleNewCategory(value)
                inputRef.current.value = ''
              } else {
                inputRef?.current?.focus()
              }
            }}
          />
        </div>
      </header>
      <Table dbID={tableId} />
      {/* <ElementTable id={'haha'} /> */}
    </>
  )
}
