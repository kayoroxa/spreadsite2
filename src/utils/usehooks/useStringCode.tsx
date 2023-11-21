// export default function useStringCode(string: string) {
//   const { dataBase } = useContext(dataContext)
//   const [result, setResult] = useState('')

//   useEffect(() => {
//     const isCode = string.startsWith('=')
//     if (isCode) {
//       const base = dataBase[0].data
//       try {
//         const code = eval(string.slice(1))
//         setResult(typeof code === 'string' ? code : JSON.stringify(code))
//       } catch (error) {
//         setResult(string)
//       }
//     }
//     setResult(string)
//   }, [string])

//   return {
//     result,
//   }
// }

export default function useStringCode(string: string, data: any) {
  let db = data
  const isCode = string.startsWith('=')
  if (isCode && data) {
    try {
      const code = eval(string.slice(1))
      return { result: typeof code === 'string' ? code : JSON.stringify(code) }
    } catch (err: { message: string }) {
      // debugger
      return { result: '', error: err.message }
    }
  }
  return { result: string.replace(/["'`]/g, '') }
}
