import { useContext, useEffect } from 'react'
import dataContext from '../context/dataContext'
import initial from '../utils/mock-data.json'

function Button({ text }: { text: string }) {
  return (
    <button className="bg-zinc-600 hover:bg-zinc-500 text-white-800 font-bold py-2 px-4 rounded">
      {text}
    </button>
  )
}

function Table({ dbID }: { dbID: string }) {
  const { dataBase, setDataBase } = useContext(dataContext)

  useEffect(() => {
    const index = dataBase.findIndex(v => v.id === dbID)
    if (!dataBase[index]) {
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
      <div>{JSON.stringify(dataBase)}</div>
      <table className="table table-auto w-full">
        <thead>
          <tr>
            {Object.keys(data[0]).map(v => (
              <th>{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((line, lineIndex) => (
            <tr>
              {Object.entries(line).map(([category, value]) => (
                <td
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
    </div>
  )
}

export default function SessionDB() {
  // const { editionMode } = useContext(devContext)

  return (
    <>
      <header className="flex w-full items-center  gap-5 py-2 px-4">
        <div>
          Database: <strong>Tabela nutricional</strong>
        </div>
        <div className="ml-auto flex gap-5">
          <Button text="new line" />
          <Button text="new category" />
        </div>
      </header>
      <Table dbID="784" />
      {/* <ElementTable id={'haha'} /> */}
    </>
  )
}
