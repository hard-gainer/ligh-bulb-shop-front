import { useSelector, useDispatch } from "react-redux";


export default function Counter() {
    const count = useSelector(state => state.count);
    const dispatch = useDispatch();

    return (
        <>
            <div>Counter: {count}</div>
            <button onClick={() => {dispatch({type: "increase"})}}>
                Инкремент
            </button>

            <button onClick={() => {dispatch({type: "decrease"})}}>
                Декремент
            </button>
        </>
    )
}