import { useState, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Navigate, Link } from "react-router-dom"
import Header from "../../components/Header"
import ContactsForm from "../../components/ContactsForm"
import DeliveryForm from "../../components/DeliveryForm"
import PaymentForm from "../../components/PaymentForm"
import CheckoutSidebar from "../../components/CheckoutSidebar"
import { placeOrder } from "../../store/actions/ordersActions"
import style from "./style.module.css"

const STEPS = ["Контакты", "Доставка", "Оплата"]

export default function CheckoutPage() {
  const cartItems = useSelector(state => state.cart)
  const { loading, error } = useSelector(state => state.orders)
  const dispatch = useDispatch()

  const [step, setStep] = useState(0)
  const [contacts, setContacts] = useState({ name: "", email: "", phone: "", comment: "" })
  const [delivery, setDelivery] = useState({ type: "courier", address: "", addressComment: "", storeId: null })
  const [payment, setPayment] = useState("cash")
  const [placedOrder, setPlacedOrder] = useState(null)

  if (cartItems.length === 0 && !placedOrder) {
    return <Navigate to="/cart" replace />
  }

  if (placedOrder) {
    return (
      <div className={style.page}>
        <Header />
        <div className={style.successWrapper}>
          <div className={style.successCard}>
            <div className={style.successIcon}>✓</div>
            <h1 className={style.successTitle}>Заказ оформлен!</h1>
            <p className={style.successText}>
              Номер вашего заказа: <strong>#{placedOrder.order_id}</strong>
            </p>
            <p className={style.successText}>
              Сумма заказа: <strong>{placedOrder.total_price?.toLocaleString("ru-RU")} ₽</strong>
            </p>
            <p className={style.successSub}>
              Мы пришлём подтверждение на {placedOrder.email}
            </p>
            <Link to="/" className={style.successBtn}>
              Вернуться в каталог
            </Link>
          </div>
        </div>
      </div>
    )
  }

  async function handleConfirm() {
    const result = await dispatch(placeOrder({ contacts, delivery, cartItems }))
    if (result.success) {
      setPlacedOrder(result.order)
    }
  }

  return (
    <div className={style.page}>
      <Header />
      <div className={style.content}>
        <div className={style.form}>
          <div className={style.steps}>
            {STEPS.map((label, i) => (
              <Fragment key={i}>
                <div className={i === step ? style.stepActive : i < step ? style.stepDone : style.step}>
                  <span className={style.stepNum}>{i < step ? "✓" : i + 1}</span>
                  <span className={style.stepLabel}>{label}</span>
                </div>
                {i < STEPS.length - 1 && <span className={style.stepSep} />}
              </Fragment>
            ))}
          </div>

          {step === 0 && (
            <ContactsForm data={contacts} onChange={setContacts} onNext={() => setStep(1)} />
          )}
          {step === 1 && (
            <DeliveryForm data={delivery} onChange={setDelivery} onBack={() => setStep(0)} onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <>
              <PaymentForm value={payment} onChange={setPayment} onBack={() => setStep(1)} onConfirm={handleConfirm} loading={loading} />
              {error && <p className={style.orderError}>{error}</p>}
              {loading && <p className={style.orderLoading}>Оформляем заказ...</p>}
            </>
          )}
        </div>

        <CheckoutSidebar items={cartItems} />
      </div>
    </div>
  )
}
