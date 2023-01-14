interface IProps {
  id: string
}

import { DataGrid as DataGridElement } from '@mui/x-data-grid'
import { memo, useContext, useEffect, useState } from 'react'
import { devContext } from '../organisms/WrapperDevEdit'

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
  const [columns, setColumns] = useState([
    {
      field: 'food',
      headerName: 'food',
      editable: true,
    },
    {
      field: 'Kcal',
      headerName: 'Kcal',
      editable: true,
    },
    {
      field: 'Carb',
      headerName: 'Carb',
      editable: true,
    },
    {
      field: 'protein',
      headerName: 'protein',
      editable: true,
    },
    {
      field: 'gordura',
      headerName: 'gordura',
      editable: true,
    },
    {
      field: 'sódio',
      headerName: 'sódio',
      editable: true,
    },
  ])

  const [rows, setRows] = useState([
    {
      id: 0,
      food: 'ovo',
      Kcal: '456',
      Carb: '4',
      protein: '45',
      gordura: '4',
      sódio: '46',
    },
    {
      id: 1,
      food: 'frango',
      Kcal: '456',
      Carb: '4',
      protein: '45',
      gordura: '4',
      sódio: '46',
    },
    {
      id: 2,
      food: 'arroz',
      Kcal: '456',
      Carb: '4',
      protein: '45',
      gordura: '4',
      sódio: '46',
    },
  ])

  const [jsonData, setJsonData] = useState(json)

  // const { rows, columns } = useMemo(
  //   () => convertJsonToTableData(jsonData),
  //   [jsonData]
  // )
  // useEffect(() => {
  //   setDataBase((prev) => {
  //     const index = prev.findIndex(v => v.id === id)
  //     prev[index] =
  //     return prev
  //   })
  // }, [jsonData])

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
      {/* <div>{rows[0]?.Carb}</div> */}
      <DataGrid
        rows={rows}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        // onStateChange={v => setRows(v.rows.idRowsLookup)}
      />
    </div>
  )
}
