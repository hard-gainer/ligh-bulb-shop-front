import { useState } from "react"
import { useSelector } from "react-redux"
import { apiUpdatePassword } from "../../api/auth"
import style from "./style.module.css"

export default function ProfileTab() {
  const user = useSelector(state => state.auth.user)
  const accessToken = useSelector(state => state.auth.accessToken)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [status, setStatus] = useState(null)

  if (!user) {
    return <p className={style.empty}>Информация о профиле недоступна.</p>
  }

  async function handleChangePassword(e) {
    e.preventDefault()
    setStatus(null)

    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", text: "Новый пароль и подтверждение не совпадают." })
      return
    }
    if (newPassword.length < 6) {
      setStatus({ type: "error", text: "Новый пароль должен содержать минимум 6 символов." })
      return
    }

    try {
      await apiUpdatePassword(accessToken, newPassword)
      setStatus({ type: "success", text: "Пароль успешно изменён." })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      setStatus({ type: "error", text: err.message })
    }
  }

  return (
    <div className={style.profile}>
      <h2 className={style.title}>Профиль</h2>

      <div className={style.fields}>
        <div className={style.field}>
          <span className={style.label}>Email</span>
          <span className={style.value}>{user.email}</span>
        </div>
        <div className={style.field}>
          <span className={style.label}>ID пользователя</span>
          <span className={style.value}>{user.user_id}</span>
        </div>
      </div>

      <div className={style.passwordSection}>
        <h3 className={style.sectionTitle}>Смена пароля</h3>
        <form className={style.form} onSubmit={handleChangePassword}>
          <div className={style.formField}>
            <label className={style.fieldLabel}>Текущий пароль</label>
            <input
              type="password"
              className={style.input}
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className={style.formField}>
            <label className={style.fieldLabel}>Новый пароль</label>
            <input
              type="password"
              className={style.input}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className={style.formField}>
            <label className={style.fieldLabel}>Подтвердите пароль</label>
            <input
              type="password"
              className={style.input}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {status && (
            <p className={status.type === "error" ? style.error : style.success}>
              {status.text}
            </p>
          )}

          <button type="submit" className={style.submitBtn}>Сменить пароль</button>
        </form>
      </div>
    </div>
  )
}
