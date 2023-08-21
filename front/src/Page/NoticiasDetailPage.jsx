

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CommentSection from '../componentes/CommentSection';
import jwt_decode from 'jwt-decode';

import MenuNavegacion from '../componentes/MenuNavegacion';

const NoticiaDetailPage = () => {
  const { idNoticia } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [comentarios, setComentarios] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const obtenerNoticiaDetalle = async () => {
      try {
        const response = await axios.get(`http://localhost:2222/api/noticias/${idNoticia}`, {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });
        setNoticia(response.data.noticia);
        setComentarios(response.data.noticia.comentarios); // Actualiza solo los comentarios de la noticia
      } catch (error) {
        console.error(error);
      }
    };

    obtenerNoticiaDetalle();

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserRole(decodedToken.rol);
    }
  }, [idNoticia]);

  const isAdmin = userRole === 'admin';
  const isEditor = userRole === 'editor';

  if (!noticia) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div>
        <MenuNavegacion />
      </div>
      <div className="container mx-auto px-4 py-8">
        {noticia ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{noticia.nombre}</h2>
            <p className="text-gray-500 mb-4">{noticia.sinopsis}</p>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm">Fecha de publicación: {noticia.fecha_publicacion}</p>
              <p className="text-gray-400 text-sm">Categoría: {noticia.categoria}</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm">Autor: {noticia.autor}</p>
              <p className="text-gray-400 text-sm">Tags: {noticia.tags}</p>
            </div>
            <img className="w-full h-auto mb-4" src={noticia.imagen} alt={noticia.nombre} />
            <p>{noticia.descripcion}</p>
          </>
        ) : (
          <p>Cargando...</p>
        )}
        <div>
          <CommentSection comentarios={comentarios} entityId={noticia._id} />
        </div>
        {isAdmin && (
          <>
            <div>
              <button className="mt-5">
                <Link
                  to={`/noticias/${idNoticia}/delete`}
                  className="bg-red-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Eliminar noticia
                </Link>
              </button>
            </div>
            <div>
              <button className="mt-5">
                <Link
                  to={`/noticias/${idNoticia}/edit`}
                  className="bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Editar noticia
                </Link>
              </button>
            </div>
          </>
        )}
        {isEditor && (
          <div>
            <button className="mt-5">
              <Link
                to={`/noticias/${idNoticia}/edit`}
                className="bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Editar noticia
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticiaDetailPage;
