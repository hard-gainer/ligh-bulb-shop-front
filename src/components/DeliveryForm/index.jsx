import CourierDelivery from "../CourierDelivery"
import PickupDelivery from "../PickupDelivery"
import style from "./style.module.css"

export default function DeliveryForm({ data, onChange, onBack, onNext }) {
  function update(key, value) {
    onChange({ ...data, [key]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (data.type === "pickup" && !data.storeId) {
      alert("Пожалуйста, выберите магазин для самовывоза")
      return
    }
    onNext()
  }

  return (
    <div className={style.block}>
      <h2 className={style.title}>Способ получения</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.tabs}>
          <button
            type="button"
            className={data.type === "courier" ? style.tabActive : style.tab}
            onClick={() => update("type", "courier")}
          >
            Доставка курьером
          </button>
          <button
            type="button"
            className={data.type === "pickup" ? style.tabActive : style.tab}
            onClick={() => update("type", "pickup")}
          >
            Самовывоз
          </button>
        </div>

        {data.type === "courier" ? (
          <CourierDelivery data={data} onChange={onChange} />
        ) : (
          <PickupDelivery
            selected={data.storeId}
            onSelect={id => update("storeId", id)}
          />
        )}

        <div className={style.actions}>
          <button type="button" className={style.backBtn} onClick={onBack}>Назад</button>
          <button type="submit" className={style.nextBtn}>Далее</button>
        </div>
      </form>
    </div>
  )
}
