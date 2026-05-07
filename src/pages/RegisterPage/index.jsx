import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Header from "../../components/Header"
import { registerUser } from "../../store/actions/authActions"
import style from "./style.module.css"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [clientError, setClientError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(state => state.auth)

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) {
      setClientError("Пароли не совпадают")
      return
    }
    setClientError("")
    const result = await dispatch(registerUser(email, password))
    if (result.success) {
      navigate("/")
    }
  }

  const displayError = clientError || error

  return (
    <div className={style.page}>
      <Header />
      <div className={style.container}>
        <div className={style.card}>
          <h1 className={style.title}>Регистрация</h1>
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
                placeholder="Минимум 6 символов"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            <div className={style.field}>
              <label className={style.label}>Повторите пароль</label>
              <input
                className={style.input}
                type="password"
                placeholder="Повторите пароль"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
              />
            </div>
            {displayError && <p className={style.error}>{displayError}</p>}
            <button type="submit" className={style.btn} disabled={loading}>
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </form>
          <p className={style.footer}>
            Уже есть аккаунт?{" "}
            <Link to="/auth" className={style.link}>Войти</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
