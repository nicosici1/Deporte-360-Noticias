import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuNavegacion from '../componentes/MenuNavegacion';


const DeleteNoticiaPage = () => {
   
  const { idNoticia } = useParams();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate('')

  const handleDelete = () => {
    fetch(`http://localhost:2222/api/noticias/${idNoticia}/delete `, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token')
      },

    })
    
      .then(response => response.json())  // Devolver la respuesta como JSON
      .then(data => {
        console.log(data);
        navigate('/noticias', { replace: true });
      })
      .catch(error => {
        console.error('Error creating news:', error);
      });

  };


 
    return (
      <div>
      <div>
        <MenuNavegacion />
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-4 rounded shadow">
          {confirmDelete ? (
            <div>
              <p className="mb-2 text-center">¿Estás seguro que deseas borrar esta noticia?</p>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleDelete}
                >
                  Sí, borrar
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">Estás por eliminar la noticia </p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setConfirmDelete(true)}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
    );
};

export default DeleteNoticiaPage;