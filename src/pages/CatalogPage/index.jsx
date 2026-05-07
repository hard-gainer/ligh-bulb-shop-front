import { useState, useMemo, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../../components/Header"
import FilterSidebar from "../../components/FilterSidebar"
import ProductGrid from "../../components/ProductGrid"
import { loadProducts, loadCategories } from "../../store/actions/catalogActions"
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
  const dispatch = useDispatch()
  const { products, categories, loading, error } = useSelector(state => state.catalog)
  const [filters, setFilters] = useState(initialFilters)

  useEffect(() => {
    dispatch(loadCategories())
  }, [dispatch])

  const fetchWithFilters = useCallback(
    (f) => {
      dispatch(loadProducts({
        categoryId: f.categoryId,
        minPrice: f.minPrice,
        maxPrice: f.maxPrice,
      }))
    },
    [dispatch]
  )

  useEffect(() => {
    fetchWithFilters(filters)
  }, [filters.categoryId, filters.minPrice, filters.maxPrice]) // eslint-disable-line

  const visibleProducts = useMemo(() => {
    return products.filter(p => {
      if (filters.wattages.length > 0 && !filters.wattages.includes(`${p.wattage}W`)) return false
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false
      if (filters.sockets.length > 0 && !filters.sockets.includes(p.socket)) return false
      return true
    })
  }, [products, filters.wattages, filters.brands, filters.sockets])

  return (
    <div className={style.page}>
      <Header />
      <div className={style.content}>
        <FilterSidebar
          filters={filters}
          categories={categories}
          onChange={setFilters}
        />
        <main className={style.main}>
          {error && <p className={style.error}>{error}</p>}
          {loading ? (
            <p className={style.loading}>Загрузка товаров...</p>
          ) : (
            <>
              <p className={style.count}>{visibleProducts.length} товаров</p>
              <ProductGrid products={visibleProducts} />
            </>
          )}
        </main>
      </div>
    </div>
  )
}
