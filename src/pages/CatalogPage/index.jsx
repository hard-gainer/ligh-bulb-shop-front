import { useState, useMemo } from "react"
import Header from "../../components/Header"
import FilterSidebar from "../../components/FilterSidebar"
import ProductGrid from "../../components/ProductGrid"
import { mockProducts, mockCategories } from "../../data/mockData"
import style from "./style.module.css"

const initialFilters = {
  minPrice: "",
  maxPrice: "",
  categoryId: null,
  wattages: [],
  brands: [],
  sockets: [],
}

export default function CatalogPage() {
  const [filters, setFilters] = useState(initialFilters)

  const products = useMemo(() => {
    return mockProducts.filter(p => {
      if (filters.minPrice !== "" && p.price < Number(filters.minPrice)) return false
      if (filters.maxPrice !== "" && p.price > Number(filters.maxPrice)) return false
      if (filters.categoryId !== null && p.category_id !== filters.categoryId) return false
      if (filters.wattages.length > 0 && !filters.wattages.includes(`${p.wattage}W`)) return false
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false
      if (filters.sockets.length > 0 && !filters.sockets.includes(p.socket)) return false
      return true
    })
  }, [filters])

  return (
    <div className={style.page}>
      <Header />
      <div className={style.content}>
        <FilterSidebar
          filters={filters}
          categories={mockCategories}
          onChange={setFilters}
        />
        <main className={style.main}>
          <p className={style.count}>{products.length} товаров</p>
          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  )
}
