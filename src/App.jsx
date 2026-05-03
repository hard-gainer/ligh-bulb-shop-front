import UserCard from "./components/UserCard"
import Counter from "./components/Counter"

function App() {
  return (
    <div>
      <UserCard name={"Анатолий"} age={25}/>
      <UserCard name={"Ольга"} age={35}/>
      <UserCard name={"Александр"} age={42}/>
      <Counter />
    </div>
  )
}

export default App
