import style from "./style.module.css"

export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className={style.filter}>
      <h3 className={style.title}>Категория</h3>
      <ul className={style.list}>
        <li>
          <button
            className={selected === null ? style.itemActive : style.item}
            onClick={() => onChange(null)}
          >
            Все категории
          </button>
        </li>
        {categories.map(cat => (
          <li key={cat.category_id}>
            <button
              className={selected === cat.category_id ? style.itemActive : style.item}
              onClick={() => onChange(cat.category_id)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
