import style from "./style.module.css"

const OPTIONS = [
  { value: "cash", label: "Наличными при получении" },
  { value: "card_online", label: "Картой онлайн" },
  { value: "card_pickup", label: "Картой при получении" },
]

export default function PaymentForm({ value, onChange, onBack, onConfirm, loading }) {
  return (
    <div className={style.block}>
      <h2 className={style.title}>Способ оплаты</h2>
      <div className={style.options}>
        {OPTIONS.map(opt => (
          <label key={opt.value} className={value === opt.value ? style.optionSelected : style.option}>
            <input
              type="radio"
              name="payment"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className={style.radio}
            />
            {opt.label}
          </label>
        ))}
      </div>
      <div className={style.actions}>
        <button type="button" className={style.backBtn} onClick={onBack}>Назад</button>
        <button type="button" className={style.confirmBtn} onClick={onConfirm} disabled={loading}>
          {loading ? "Оформляем..." : "Подтвердить заказ"}
        </button>
      </div>
    </div>
  )
}
