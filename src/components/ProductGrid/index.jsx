import ProductCard from "../ProductCard"
import style from "./style.module.css"

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return <p className={style.empty}>Товары не найдены. Попробуйте изменить фильтры.</p>
  }

  return (
    <div className={style.grid}>
      {products.map(product => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  )
}
