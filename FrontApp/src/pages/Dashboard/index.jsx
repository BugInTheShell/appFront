import Header from "./Header"
import TableData from "./Table/index"
const Inicio = () => {
  return (
    <div className="block w-full" >
      <Header/>
      <div className="div p-4 px-6">
        <TableData/>
      </div>
    </div>
  )
}

export default Inicio