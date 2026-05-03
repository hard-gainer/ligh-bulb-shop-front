import style from "./style.module.css"

export default function ContactsForm({ data, onChange, onNext }) {
  function update(key, value) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className={style.block}>
      <h2 className={style.title}>Контактные данные</h2>
      <form className={style.form} onSubmit={e => { e.preventDefault(); onNext() }}>
        <div className={style.field}>
          <label className={style.label}>Имя *</label>
          <input
            className={style.input}
            type="text"
            placeholder="Ваше имя"
            value={data.name}
            onChange={e => update("name", e.target.value)}
            required
          />
        </div>
        <div className={style.field}>
          <label className={style.label}>Email *</label>
          <input
            className={style.input}
            type="email"
            placeholder="example@mail.ru"
            value={data.email}
            onChange={e => update("email", e.target.value)}
            required
          />
        </div>
        <div className={style.field}>
          <label className={style.label}>Телефон *</label>
          <input
            className={style.input}
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={data.phone}
            onChange={e => update("phone", e.target.value)}
            required
          />
        </div>
        <div className={style.field}>
          <label className={style.label}>Комментарий к заказу</label>
          <textarea
            className={style.textarea}
            placeholder="Дополнительная информация"
            value={data.comment}
            onChange={e => update("comment", e.target.value)}
            rows={3}
          />
        </div>
        <div className={style.actions}>
          <button type="submit" className={style.nextBtn}>Далее</button>
        </div>
      </form>
    </div>
  )
}
