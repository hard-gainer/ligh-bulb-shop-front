import style from "./style.module.css"

export default function PriceRangeFilter({ min, max, onMinChange, onMaxChange }) {
  return (
    <div className={style.filter}>
      <h3 className={style.title}>Цена, ₽</h3>
      <div className={style.inputs}>
        <input
          className={style.input}
          type="number"
          placeholder="От"
          value={min}
          min={0}
          onChange={e => onMinChange(e.target.value)}
        />
        <span className={style.sep}>—</span>
        <input
          className={style.input}
          type="number"
          placeholder="До"
          value={max}
          min={0}
          onChange={e => onMaxChange(e.target.value)}
        />
      </div>
    </div>
  )
}
