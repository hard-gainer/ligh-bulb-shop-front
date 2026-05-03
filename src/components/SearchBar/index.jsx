import { useState } from "react"
import style from "./style.module.css"

export default function SearchBar() {
  const [value, setValue] = useState("")

  return (
    <div className={style.wrapper}>
      <input
        className={style.input}
        type="text"
        placeholder="Поиск товаров..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}
