import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import MenuNavegacion from '../componentes/MenuNavegacion';

const ProfilePage = () => {
  const [cuenta, setCuenta] = useState(null);

  useEffect(() => {
    const obtenerDatosCuenta = async () => {
      try {
        const idCuenta = obtenerIdCuenta();
        const response = await fetch(`http://localhost:2222/api/cuenta/${idCuenta}`, {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      });
        const data = await response.json();
        setCuenta(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    obtenerDatosCuenta();
  }, []);

  const obtenerIdCuenta = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        console.log(decodedToken)
        return decodedToken._id;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
    return null;
  };

  //  handleFileChange se encarga de leer el archivo seleccionado 
  // y actualizar el estado de cuenta con la URL del archivo cargado en el campo profilePicture. 
  // Esto permite mostrar la imagen seleccionada en la interfaz de usuario.

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setCuenta((prevCuenta) => ({
        ...prevCuenta,
        profilePicture: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
    <div>
      <MenuNavegacion />
    </div>
    <div className="flex flex-col p-5"> 
    <h2 className="text-2xl font-semibold text-center my-4">Perfil de usuario</h2>
      <div className="max-w-md mx-auto w-full shadow p-6 rounded-md">
        <div className="mb-4 bg-green">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Foto de perfil:
          </label>
          {cuenta?.profilePicture ? (
            <img
              className="w-24 h-24 rounded-full object-cover"
              src={cuenta.profilePicture}
              alt="Profile"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Agregar foto de perfil:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border-gray-300 focus:ring-green-500 focus:border-green-500 block w-full p-2 rounded-md"
          />
        </div> 
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre:
          </label>
          <p className="text-gray-800 capitalize">{(cuenta?.userName)}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <p className="text-gray-800 capitalize">{cuenta?.rol}</p>
        </div>
        
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
