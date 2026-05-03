import React from 'react'
import style from "./style.module.css"

export default function UserCard({name, age}) {
    return (
        <div className={style.container}>
            <p>Имя: {name}</p>
            <p>Возраст: {age}</p>
        </div>
    )
}