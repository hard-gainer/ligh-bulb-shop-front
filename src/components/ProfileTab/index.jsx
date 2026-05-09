import { useSelector } from "react-redux"
import style from "./style.module.css"

const ROLE_LABELS = {
  USER: "Покупатель",
  ADMIN: "Администратор",
}

export default function ProfileTab() {
  const user = useSelector(state => state.auth.user)

  if (!user) {
    return <p className={style.empty}>Информация о профиле недоступна.</p>
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
        <div className={style.field}>
          <span className={style.label}>Роль</span>
          <span className={style.value}>{ROLE_LABELS[user.role] || user.role}</span>
        </div>
      </div>
    </div>
  )
}
