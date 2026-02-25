import { useEffect, useState } from "react";


const MonthSelector = ( {onChange})=> {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())

  useEffect(() =>{
    onChange({month, year})
  }, [month,year ])

  return (
    <div style={{marginBottom: 20}}>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          >
            {Array.from({length: 12}).map((_, i) =>(
                <option key={i} value={i}>
                  {new Date(0,i).toLocaleString('es-AR',{month: 'long'})}
                </option>
            ))}

        </select>
        <input
        type="number"
        value={year}
        onChange={(e) =>setYear(Number(e.target.value))}
        style={{marginLeft: 10, width: 90}} />

    </div>
  )
}
export default MonthSelector