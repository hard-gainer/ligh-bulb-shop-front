import style from "./style.module.css"

export default function CourierDelivery({ data, onChange }) {
  function update(key, value) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className={style.wrapper}>
      <div className={style.field}>
        <label className={style.label}>Адрес доставки *</label>
        <input
          className={style.input}
          type="text"
          placeholder="Город, улица, дом, квартира"
          value={data.address}
          onChange={e => update("address", e.target.value)}
          required
        />
      </div>
      <div className={style.field}>
        <label className={style.label}>Комментарий к адресу</label>
        <input
          className={style.input}
          type="text"
          placeholder="Код домофона, этаж и т.д."
          value={data.addressComment}
          onChange={e => update("addressComment", e.target.value)}
        />
      </div>
    </div>
  )
}
