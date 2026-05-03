import Logo from "../Logo"
import SearchBar from "../SearchBar"
import UserActions from "../UserActions"
import style from "./style.module.css"

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.inner}>
        <Logo />
        <SearchBar />
        <UserActions />
      </div>
    </header>
  )
}
