import Header from "./Header"
import TableData from "./Table/index"
import UploadFile from "./UploadFile";
import { useSelector } from "react-redux";
import GetFiles from "./ShowFiles";

const Inicio = () => {

  const view = useSelector((state) => state?.userView?.value);
  console.log("Vista actual ",view)


  return (
    <div className="block w-full" >
      <Header/>

      <div>
        <div className={view == "Inicio" ? "":"hidden"}>
          <h1>Inicio</h1>
        </div>

        <div className={view == "Usuarios" ? " ":"hidden"}>

          <TableData/>

        </div>


        <div className={view == "Archivos" ? "":"hidden"}>

          <GetFiles/>

        </div>


      </div>


    </div>
  )
}

export default Inicio