import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  loadAdminProducts,
  loadAdminCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../store/actions/adminActions"
import style from "./style.module.css"

const EMPTY_FORM = {
  category_id: "",
  name: "",
  sku: "",
  description: "",
  price: "",
  stock_qty: "",
}

export default function AdminProducts({ getToken }) {
  const dispatch = useDispatch()
  const { products, categories, loading } = useSelector(state => state.admin)

  const [showForm, setShowForm] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    dispatch(loadAdminProducts())
    dispatch(loadAdminCategories())
  }, [dispatch])

  function openCreate() {
    setEditTarget(null)
    setForm(EMPTY_FORM)
    setFormError("")
    setShowForm(true)
  }

  function openEdit(product) {
    setEditTarget(product)
    setForm({
      category_id: product.category_id ?? "",
      name: product.name ?? "",
      sku: product.sku ?? "",
      description: product.description ?? "",
      price: product.price ?? "",
      stock_qty: product.stock_qty ?? "",
    })
    setFormError("")
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditTarget(null)
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const token = getToken()
    if (!token) return

    setFormError("")
    setSaving(true)

    const data = {
      category_id: Number(form.category_id),
      name: form.name,
      sku: form.sku,
      description: form.description,
      price: Number(form.price),
      stock_qty: Number(form.stock_qty),
    }

    const result = editTarget
      ? await dispatch(updateProduct(token, editTarget.product_id, data))
      : await dispatch(createProduct(token, data))

    setSaving(false)

    if (result.success) {
      closeForm()
    } else {
      setFormError(result.error)
    }
  }

  async function handleDelete(productId) {
    if (!window.confirm("Удалить товар?")) return
    const token = getToken()
    if (!token) return
    await dispatch(deleteProduct(token, productId))
  }

  return (
    <div className={style.section}>
      <div className={style.sectionHeader}>
        <h2 className={style.sectionTitle}>Товары</h2>
        <button className={style.btnPrimary} onClick={openCreate}>
          + Создать товар
        </button>
      </div>

      {loading && <p>Загрузка...</p>}

      <div className={style.tableWrap}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>SKU</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Склад</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && !loading && (
              <tr>
                <td colSpan={7} className={style.empty}>Нет товаров</td>
              </tr>
            )}
            {products.map(p => {
              const cat = categories.find(c => c.category_id === p.category_id)
              return (
                <tr key={p.product_id}>
                  <td>{p.product_id}</td>
                  <td>{p.name}</td>
                  <td>{p.sku}</td>
                  <td>{cat ? cat.name : p.category_id}</td>
                  <td>{p.price} ₽</td>
                  <td>{p.stock_qty}</td>
                  <td>
                    <div className={style.actions}>
                      <button
                        className={style.btnSecondary}
                        onClick={() => openEdit(p)}
                      >
                        Изменить
                      </button>
                      <button
                        className={style.btnDanger}
                        onClick={() => handleDelete(p.product_id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className={style.modal} onClick={e => e.target === e.currentTarget && closeForm()}>
          <div className={style.modalCard}>
            <h3 className={style.modalTitle}>
              {editTarget ? "Редактировать товар" : "Создать товар"}
            </h3>
            <form className={style.form} onSubmit={handleSubmit}>
              <div className={style.field}>
                <label className={style.label}>Категория</label>
                <select
                  className={style.select}
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Выберите категорию</option>
                  {categories.map(c => (
                    <option key={c.category_id} value={c.category_id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={style.field}>
                <label className={style.label}>Название</label>
                <input
                  className={style.input}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="LED Bulb 10W E27"
                  required
                />
              </div>

              <div className={style.field}>
                <label className={style.label}>SKU</label>
                <input
                  className={style.input}
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  placeholder="LED-10W-E27"
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
                  placeholder="Описание товара..."
                />
              </div>

              <div className={style.formRow}>
                <div className={style.field}>
                  <label className={style.label}>Цена (₽)</label>
                  <input
                    className={style.input}
                    name="price"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={style.field}>
                  <label className={style.label}>Количество на складе</label>
                  <input
                    className={style.input}
                    name="stock_qty"
                    type="number"
                    min="0"
                    value={form.stock_qty}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {formError && <p className={style.error}>{formError}</p>}

              <div className={style.formActions}>
                <button
                  type="button"
                  className={style.btnSecondary}
                  onClick={closeForm}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className={style.btnPrimary}
                  disabled={saving}
                >
                  {saving ? "Сохраняем..." : "Сохранить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
