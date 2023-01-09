interface IProps {
  id: string
}

import { DataGrid as DataGridElement } from '@mui/x-data-grid'
import { memo, useContext, useEffect, useMemo, useState } from 'react'
import { devContext } from '../organisms/WrapperDevEdit'
import { convertJsonToTableData } from '../utils/tableFuncs'

const DataGrid = memo(DataGridElement)

const json: { [k: string]: string }[] = [
  {
    food: 'ovo',
    Kcal: '456',
    Carb: '4',
    protein: '45',
    gordura: '4',
    sódio: '46',
  },
  {
    food: 'frango',
    Kcal: '456',
    Carb: '4',
    protein: '45',
    gordura: '4',
    sódio: '46',
  },
  {
    food: 'arroz',
    Kcal: '456',
    Carb: '4',
    protein: '45',
    gordura: '4',
    sódio: '46',
  },
]

export default function ElementTable({ id }: IProps) {
  const { setControls, controls } = useContext(devContext)
  const [jsonData, setJsonData] = useState(json)

  const { rows, columns } = useMemo(
    () => convertJsonToTableData(jsonData),
    [jsonData]
  )

  function set() {
    setControls({
      [id]: {
        type: 'textArea',
        value: JSON.stringify(jsonData, null, 2),
      },
    })
  }

  useEffect(() => {
    const control = controls[id]
    if (!control) return

    if (typeof control.value !== 'string') {
      setJsonData(control.value as any)
    } else {
      try {
        const data = JSON.parse(control.value)
        setJsonData(data)
      } catch (error) {
        setJsonData([{ status: 'wrong data' }])
      }
    }
  }, [controls])

  return (
    <div
      style={{ height: 300 }}
      className="bg-zinc-300 flex-1"
      onClick={() => {
        set()
      }}
    >
      <DataGrid rows={rows} columns={columns} />
    </div>
  )
}
