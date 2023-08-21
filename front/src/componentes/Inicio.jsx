 

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BtnRegister from '../componentes/BtnRegister';
  
function Incio(){
   
// function LoginPage() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate('')

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(()=>{


    fetch('http://localhost:2222/api/session', {

      method: 'DELETE',
      headers:{
        'auth-token': localStorage.getItem('token')
      }
  
    })
    localStorage.removeItem('token')
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();

      if(userName === "" || password === ""){
        setError(true)
        return
      } 
     setError(false)

     fetch('http://localhost:2222/api/session', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userName, password})
    })
    .then(async response=>{
        if(response.ok){
          return await response.json()
        } else {
          throw await response.json()
        }
    })
    .then(({token, cuenta})=>{
        console.log("Sesion iniciada", {token , cuenta})

        localStorage.setItem('token', token)

        navigate('/noticias', {replace : true})
    })
    .catch(error=>{
      console.log("Error al iniciar sesion", error)
      setError(error.error.message)
    })
   
  };
    return(
        <>
            
            <div className="max-w-[600px] mx-auto relative bg-transparent p-8 rounded-lg shadow-md mt-5">
            <div className="absolute inset-0 bg-white opacity-80 rounded-lg"></div>
            <div className="flex flex-col sm:flex-row sm:justify-center relative z-10">
                <form className="w-full sm:w-64 p-4" onSubmit={handleSubmit}>
                <h2 className="text-3xl text-green-700 font-bold mb-4 text-center sm:text-left">Iniciar sesión</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2">Usuario</label>
                    <input
                    type="text"
                    id="username"
                    value={userName}
                    onChange={handleUsernameChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">Contraseña</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Iniciar sesión
                </button>
                <div className="py-4 text-md text-center sm:text-left">
                    <p className="text-sm text-center">¿No tienes cuenta? <BtnRegister /></p>
                </div>
                </form>
            </div>
            </div>




           
        </>
        )
}

export default Incio