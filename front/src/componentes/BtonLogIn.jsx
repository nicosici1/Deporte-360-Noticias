import { Link } from "react-router-dom"

function BtnLoIn(){
return(
    <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600">
      <Link  to="/login">Iniciar sesión</Link>
    </button>
    )

}

export default BtnLoIn