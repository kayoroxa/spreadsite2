export function convertJsonToTableData(
  json: { [k: string]: string | number }[]
) {
  const rows = json.map((v, i) => {
    const values = Object.values(v)
    const keys = Object.keys(v)

    return {
      id: i,
      ...Object.fromEntries(values.map((value, ki) => [keys[ki], value])),
    }
  })

  const allKeys = json
    .map(v => Object.keys(v))
    .reduce((acc, cur) => [...acc, ...cur], [])

  const uniqKeys = Array.from(new Set(allKeys))

  const columns = uniqKeys.map(keyName => ({
    field: keyName,
    headerName: keyName,
  }))

  return {
    rows,
    columns,
  }
}
