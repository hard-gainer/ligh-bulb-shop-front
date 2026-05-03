import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import Header from "../../components/Header"
import style from "./style.module.css"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) {
      setError("Пароли не совпадают")
      return
    }
    setError("")
    dispatch({ type: "auth/setUser", payload: { email, user_id: 1, role: "USER" } })
    navigate("/")
  }

  return (
    <div className={style.page}>
      <Header />
      <div className={style.container}>
        <div className={style.card}>
          <h1 className={style.title}>Регистрация</h1>
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.field}>
              <label className={style.label}>Email или телефон</label>
              <input
                className={style.input}
                type="text"
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
            {error && <p className={style.error}>{error}</p>}
            <button type="submit" className={style.btn}>Зарегистрироваться</button>
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
