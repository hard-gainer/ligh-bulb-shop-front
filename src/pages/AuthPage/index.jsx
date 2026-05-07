import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Header from "../../components/Header"
import { loginUser } from "../../store/actions/authActions"
import style from "./style.module.css"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(state => state.auth)

  async function handleSubmit(e) {
    e.preventDefault()
    const result = await dispatch(loginUser(email, password))
    if (result.success) {
      navigate("/")
    }
  }

  return (
    <div className={style.page}>
      <Header />
      <div className={style.container}>
        <div className={style.card}>
          <h1 className={style.title}>Вход в аккаунт</h1>
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.field}>
              <label className={style.label}>Email</label>
              <input
                className={style.input}
                type="email"
                placeholder="example@mail.ru"
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
          <p className={style.footer}>
            Нет аккаунта?{" "}
            <Link to="/register" className={style.link}>Зарегистрироваться</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
