import StoreCard from "../StoreCard"
import { mockStores } from "../../data/mockData"
import style from "./style.module.css"

export default function PickupDelivery({ selected, onSelect }) {
  return (
    <div className={style.list}>
      {mockStores.map(store => (
        <StoreCard
          key={store.store_id}
          store={store}
          isSelected={selected === store.store_id}
          onSelect={() => onSelect(store.store_id)}
        />
      ))}
    </div>
  )
}
