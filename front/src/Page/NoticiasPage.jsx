import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuNavegacion from '../componentes/MenuNavegacion';
import FiltroLigas from '../componentes/FiltroLigas';

const NoticiasPage = () => {
  const [noticias, setNoticias] = useState([]);
  const [ligas, setLigas] = useState([]);
  const [filtroLiga, setFiltroLiga] = useState('');

  useEffect(() => {
   
    fetch('http://localhost:2222/api/noticias', {
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener los datos de la API.');
        }
      })
      .then(data => {
        setNoticias(data);
      })
      .catch(error => {
        console.error('Error al obtener las noticias:', error);
      });

    
    fetch('http://localhost:2222/api/ligas')
      .then(response => response.json())
      .then(data => {
        setLigas(data);
      })
      .catch(error => {
        console.error('Error al obtener las ligas:', error);
      });
  }, []);

    const filtrarNoticias = ligaId => {
      setFiltroLiga(ligaId.toString()); 
    };
    

    const noticiasFiltradas = filtroLiga
  ? noticias.filter(noticia => noticia.liga && noticia.liga.toString() === filtroLiga)
  : noticias;
    

  return (
    <div>
      <div>
        <MenuNavegacion />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-center font-bold mb-8">Noticias deportivas</h1>

        <div className="flex justify-center mb-8">
          <FiltroLigas
            categorias={ligas}
            filtroLiga={filtroLiga}
            filtrarNoticias={filtrarNoticias}
          />
        </div>

        {noticiasFiltradas.length === 0 ? (
          <p className="text-center">No hay noticias disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticiasFiltradas.map(noticia => (
              <Link
                to={`/noticias/${noticia._id}`}
                key={noticia._id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={noticia.imagen}
                  alt={noticia.nombre}
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">{noticia.nombre}</h2>
                  <p className="text-gray-600">{noticia.sinopsis}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticiasPage;



