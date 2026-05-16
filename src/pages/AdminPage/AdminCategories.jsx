import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadAdminCategories, createCategory } from "../../store/actions/adminActions"
import style from "./style.module.css"

export default function AdminCategories({ getToken }) {
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.admin)

  const [name, setName] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    dispatch(loadAdminCategories())
  }, [dispatch])

  async function handleCreate(e) {
    e.preventDefault()
    if (!name.trim()) return

    const token = getToken()
    if (!token) return

    setSaving(true)
    setError("")
    setSuccess("")
    const result = await dispatch(createCategory(token, name.trim()))
    setSaving(false)
    if (result.success) {
      setName("")
      setSuccess("Категория создана")
      setTimeout(() => setSuccess(""), 3000)
    } else {
      setError(result.error)
    }
  }

  return (
    <div className={style.section}>
      <div className={style.sectionHeader}>
        <h2 className={style.sectionTitle}>Категории</h2>
      </div>

      <div className={style.card}>
        <h3 className={style.cardTitle}>Создать категорию</h3>
        <form className={style.inlineForm} onSubmit={handleCreate}>
          <input
            className={style.input}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Название категории"
            required
          />
          <button type="submit" className={style.btnPrimary} disabled={saving}>
            {saving ? "Создаём..." : "Создать"}
          </button>
        </form>
        {error && <p className={style.error}>{error}</p>}
        {success && <p className={style.success}>{success}</p>}
      </div>

      <div className={style.tableWrap}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr>
                <td colSpan={2} className={style.empty}>Нет категорий</td>
              </tr>
            )}
            {categories.map(c => (
              <tr key={c.category_id}>
                <td>{c.category_id}</td>
                <td>{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
