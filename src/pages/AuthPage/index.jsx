import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import Header from "../../components/Header"
import style from "./style.module.css"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: "auth/setUser", payload: { email, user_id: 1, role: "USER" } })
    navigate("/")
  }

  return (
    <div className={style.page}>
      <Header />
      <div className={style.container}>
        <div className={style.card}>
          <h1 className={style.title}>Вход в аккаунт</h1>
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
                placeholder="Введите пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={style.btn}>Войти</button>
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
