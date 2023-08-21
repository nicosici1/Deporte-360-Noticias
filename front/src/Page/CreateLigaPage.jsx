import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuNavegacion from '../componentes/MenuNavegacion';

const CreateLigaPage = () => {
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const liga = {
        nombre: nombre,
      };

      // Realizar la solicitud POST al servidor utilizando fetch
      await fetch('http://localhost:2222/api/ligas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(liga),
      })
        .then((response) => response.json()) // Devolver la respuesta como JSON
        .then((data) => {
          console.log(data);
          navigate('/ligas', { replace: true });
        })
        .catch((error) => {
          console.error('Error creating league:', error);
        });

      // Resetear el valor del formulario después de enviar los datos
      setNombre('');
    } catch (error) {
      // Manejar el error en caso de que ocurra
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <MenuNavegacion />
      </div>
      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Crear Liga</h2>
        <form onSubmit={handleSubmit} className="mx-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLigaPage;
