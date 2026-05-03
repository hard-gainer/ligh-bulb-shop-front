import style from "./style.module.css"

export default function StoreCard({ store, isSelected, onSelect }) {
  return (
    <div
      className={isSelected ? style.cardSelected : style.card}
      onClick={onSelect}
    >
      <p className={style.name}>{store.name}</p>
      <p className={style.address}>📍 {store.address}</p>
      <p className={style.hours}>🕐 {store.hours}</p>
    </div>
  )
}
