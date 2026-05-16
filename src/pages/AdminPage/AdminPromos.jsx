import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  loadAdminPromos,
  loadAdminProducts,
  createPromo,
  addProductToPromo,
  removeProductFromPromo,
} from "../../store/actions/adminActions"
import style from "./style.module.css"

const EMPTY_PROMO = {
  name: "",
  description: "",
  discount: "",
  start_date: "",
  end_date: "",
}

export default function AdminPromos({ getToken }) {
  const dispatch = useDispatch()
  const { promos, products } = useSelector(state => state.admin)

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_PROMO)
  const [formError, setFormError] = useState("")
  const [saving, setSaving] = useState(false)

  const [promoProductId, setPromoProductId] = useState("")
  const [promoTarget, setPromoTarget] = useState(null)
  const [actionMsg, setActionMsg] = useState("")
  const [actionError, setActionError] = useState("")

  useEffect(() => {
    const token = getToken()
    if (!token) return
    dispatch(loadAdminPromos(token))
    dispatch(loadAdminProducts())
  }, [dispatch, getToken])

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleCreatePromo(e) {
    e.preventDefault()
    const token = getToken()
    if (!token) return

    setFormError("")
    setSaving(true)

    const data = {
      name: form.name,
      description: form.description,
      discount: Number(form.discount),
      start_date: new Date(form.start_date).toISOString(),
      end_date: new Date(form.end_date).toISOString(),
    }

    const result = await dispatch(createPromo(token, data))
    setSaving(false)
    if (result.success) {
      setForm(EMPTY_PROMO)
      setShowForm(false)
    } else {
      setFormError(result.error)
    }
  }

  function openPromoProducts(promo) {
    setPromoTarget(promo)
    setPromoProductId("")
    setActionMsg("")
    setActionError("")
  }

  async function handleAddProduct(e) {
    e.preventDefault()
    if (!promoProductId) return
    const token = getToken()
    if (!token) return

    setActionMsg("")
    setActionError("")
    const result = await dispatch(addProductToPromo(token, promoTarget.promo_id, Number(promoProductId)))
    if (result.success) {
      setActionMsg("Товар добавлен в акцию")
      setPromoProductId("")
    } else {
      setActionError(result.error)
    }
  }

  async function handleRemoveProduct(e) {
    e.preventDefault()
    if (!promoProductId) return
    const token = getToken()
    if (!token) return

    setActionMsg("")
    setActionError("")
    const result = await dispatch(removeProductFromPromo(token, promoTarget.promo_id, Number(promoProductId)))
    if (result.success) {
      setActionMsg("Товар исключён из акции")
      setPromoProductId("")
    } else {
      setActionError(result.error)
    }
  }

  return (
    <div className={style.section}>
      <div className={style.sectionHeader}>
        <h2 className={style.sectionTitle}>Акции</h2>
        <button className={style.btnPrimary} onClick={() => { setShowForm(true); setFormError("") }}>
          + Создать акцию
        </button>
      </div>

      <div className={style.tableWrap}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Скидка</th>
              <th>Начало</th>
              <th>Конец</th>
              <th>Товары</th>
            </tr>
          </thead>
          <tbody>
            {promos.length === 0 && (
              <tr>
                <td colSpan={6} className={style.empty}>Нет акций</td>
              </tr>
            )}
            {promos.map(p => (
              <tr key={p.promo_id}>
                <td>{p.promo_id}</td>
                <td>{p.name}</td>
                <td>{p.discount}%</td>
                <td>{p.start_date ? new Date(p.start_date).toLocaleDateString("ru-RU") : "—"}</td>
                <td>{p.end_date ? new Date(p.end_date).toLocaleDateString("ru-RU") : "—"}</td>
                <td>
                  <button className={style.btnSmall} onClick={() => openPromoProducts(p)}>
                    Управление
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className={style.modal} onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className={style.modalCard}>
            <h3 className={style.modalTitle}>Создать акцию</h3>
            <form className={style.form} onSubmit={handleCreatePromo}>
              <div className={style.field}>
                <label className={style.label}>Название</label>
                <input
                  className={style.input}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Summer Sale"
                  required
                />
              </div>
              <div className={style.field}>
                <label className={style.label}>Описание</label>
                <textarea
                  className={style.textarea}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Описание акции..."
                  required
                />
              </div>
              <div className={style.field}>
                <label className={style.label}>Скидка (%)</label>
                <input
                  className={style.input}
                  name="discount"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="100"
                  value={form.discount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={style.formRow}>
                <div className={style.field}>
                  <label className={style.label}>Начало</label>
                  <input
                    className={style.input}
                    name="start_date"
                    type="datetime-local"
                    value={form.start_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={style.field}>
                  <label className={style.label}>Конец</label>
                  <input
                    className={style.input}
                    name="end_date"
                    type="datetime-local"
                    value={form.end_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {formError && <p className={style.error}>{formError}</p>}

              <div className={style.formActions}>
                <button type="button" className={style.btnSecondary} onClick={() => setShowForm(false)}>
                  Отмена
                </button>
                <button type="submit" className={style.btnPrimary} disabled={saving}>
                  {saving ? "Создаём..." : "Создать"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {promoTarget && (
        <div className={style.modal} onClick={e => e.target === e.currentTarget && setPromoTarget(null)}>
          <div className={style.modalCard}>
            <h3 className={style.modalTitle}>Акция: {promoTarget.name}</h3>
            <p style={{ marginBottom: 20, fontSize: 14, color: "var(--text-secondary)" }}>
              Добавьте или исключите товар из акции #{promoTarget.promo_id}
            </p>

            <div className={style.field} style={{ marginBottom: 12 }}>
              <label className={style.label}>Выберите товар</label>
              <select
                className={style.select}
                value={promoProductId}
                onChange={e => setPromoProductId(e.target.value)}
              >
                <option value="">— выберите товар —</option>
                {products.map(p => (
                  <option key={p.product_id} value={p.product_id}>
                    #{p.product_id} {p.name}
                  </option>
                ))}
              </select>
            </div>

            {actionError && <p className={style.error} style={{ marginBottom: 12 }}>{actionError}</p>}
            {actionMsg && <p className={style.success} style={{ marginBottom: 12 }}>{actionMsg}</p>}

            <div className={style.formActions}>
              <button type="button" className={style.btnSecondary} onClick={() => setPromoTarget(null)}>
                Закрыть
              </button>
              <button
                type="button"
                className={style.btnDanger}
                onClick={handleRemoveProduct}
                disabled={!promoProductId}
              >
                Исключить
              </button>
              <button
                type="button"
                className={style.btnPrimary}
                onClick={handleAddProduct}
                disabled={!promoProductId}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
