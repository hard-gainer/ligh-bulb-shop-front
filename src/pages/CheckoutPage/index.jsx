import { useState, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import ContactsForm from "../../components/ContactsForm"
import DeliveryForm from "../../components/DeliveryForm"
import PaymentForm from "../../components/PaymentForm"
import CheckoutSidebar from "../../components/CheckoutSidebar"
import style from "./style.module.css"

const STEPS = ["Контакты", "Доставка", "Оплата"]

export default function CheckoutPage() {
  const cartItems = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [contacts, setContacts] = useState({ name: "", email: "", phone: "", comment: "" })
  const [delivery, setDelivery] = useState({ type: "courier", address: "", addressComment: "", storeId: null })
  const [payment, setPayment] = useState("cash")

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />
  }

  function handleConfirm() {
    dispatch({ type: "cart/clear" })
    navigate("/")
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
            <PaymentForm value={payment} onChange={setPayment} onBack={() => setStep(1)} onConfirm={handleConfirm} />
          )}
        </div>

        <CheckoutSidebar items={cartItems} />
      </div>
    </div>
  )
}
