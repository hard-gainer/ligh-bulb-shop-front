import PriceRangeFilter from "../PriceRangeFilter"
import CategoryFilter from "../CategoryFilter"
import CheckboxFilter from "../CheckboxFilter"
import style from "./style.module.css"

const WATTAGE_OPTIONS = ["4W", "5W", "7W", "9W", "10W", "11W", "15W", "20W", "60W"]
const BRAND_OPTIONS = ["Gauss", "Philips", "Osram", "Navigator"]
const SOCKET_OPTIONS = ["E27", "E14", "GU10", "G9"]

export default function FilterSidebar({ filters, categories, onChange }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <aside className={style.sidebar}>
      <div className={style.header}>
        <h2 className={style.title}>Фильтры</h2>
        <button
          className={style.reset}
          onClick={() => onChange({ minPrice: "", maxPrice: "", categoryId: null, wattages: [], brands: [], sockets: [] })}
        >
          Сбросить
        </button>
      </div>

      <PriceRangeFilter
        min={filters.minPrice}
        max={filters.maxPrice}
        onMinChange={v => update("minPrice", v)}
        onMaxChange={v => update("maxPrice", v)}
      />

      <CategoryFilter
        categories={categories}
        selected={filters.categoryId}
        onChange={v => update("categoryId", v)}
      />

      <CheckboxFilter
        title="Мощность"
        options={WATTAGE_OPTIONS}
        selected={filters.wattages}
        onChange={v => update("wattages", v)}
      />

      <CheckboxFilter
        title="Производитель"
        options={BRAND_OPTIONS}
        selected={filters.brands}
        onChange={v => update("brands", v)}
      />

      <CheckboxFilter
        title="Цоколь"
        options={SOCKET_OPTIONS}
        selected={filters.sockets}
        onChange={v => update("sockets", v)}
      />
    </aside>
  )
}
