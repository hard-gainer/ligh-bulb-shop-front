import { Link } from "react-router-dom"
import style from "./style.module.css"

export default function Logo() {
  return (
    <Link to="/" className={style.logo}>
      💡 LightShop
    </Link>
  )
}
