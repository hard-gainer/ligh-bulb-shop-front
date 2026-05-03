import CartItem from "../CartItem"

export default function CartItemList({ items }) {
  return (
    <div>
      {items.map(item => (
        <CartItem key={item.product_id} item={item} />
      ))}
    </div>
  )
}
