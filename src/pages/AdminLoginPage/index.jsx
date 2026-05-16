import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiLogin, apiGetMe } from "../../api/auth"
import { setAdminToken } from "../../utils/adminAuth"
import style from "./style.module.css"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const tokens = await apiLogin(email, password)
      const user = await apiGetMe(tokens.access_token)
      if (user.role !== "ADMIN") {
        setError("Доступ только для администраторов")
        return
      }
      setAdminToken(tokens.access_token)
      navigate("/admin")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.badge}>Панель администратора</div>
          <h1 className={style.title}>Вход в систему</h1>
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.field}>
              <label className={style.label}>Email</label>
              <input
                className={style.input}
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={style.field}>
              <label className={style.label}>Пароль</label>
              <input
                className={style.input}
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            {error && <p className={style.error}>{error}</p>}
            <button type="submit" className={style.btn} disabled={loading}>
              {loading ? "Входим..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
