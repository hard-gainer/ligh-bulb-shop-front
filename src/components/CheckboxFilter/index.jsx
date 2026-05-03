import style from "./style.module.css"

export default function CheckboxFilter({ title, options, selected, onChange }) {
  function toggle(option) {
    if (selected.includes(option)) {
      onChange(selected.filter(o => o !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div className={style.filter}>
      <h3 className={style.title}>{title}</h3>
      <ul className={style.list}>
        {options.map(option => (
          <li key={option}>
            <label className={style.label}>
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggle(option)}
                className={style.checkbox}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
