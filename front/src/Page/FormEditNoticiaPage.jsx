import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuNavegacion from '../componentes/MenuNavegacion';

const FormEditNoticiaPage = () => {
  const { idNoticia } = useParams();

  const [nombre, setNombre] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tags, setTags] = useState('');
  const [categoria, setCategoria] = useState('');
  const [autor, setAutor] = useState('');
  const [imagen, setImagen] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:2222/api/noticias/${idNoticia}/edit`, {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching news');
        }

        const data = await response.json();

        setNombre(data.nombre);
        setSinopsis(data.sinopsis);
        setDescripcion(data.descripcion);
        setTags(data.tags);
        setCategoria(data.categoria);
        setAutor(data.autor);
        setImagen(data.imagen);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [idNoticia]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:2222/api/noticias/${idNoticia}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          nombre,
          sinopsis,
          descripcion,
          tags,
          categoria,
          autor,
          imagen
        })
      });

      if (!response.ok) {
        throw new Error('Error updating news');
      }

      navigate('/noticias', { replace: true });

      // Resetear los valores del formulario después de enviar los datos
      setNombre('');
      setSinopsis('');
      setDescripcion('');
      setTags('');
      setCategoria('');
      setAutor('');
      setImagen('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <MenuNavegacion />
      </div>
      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Modificar Noticia</h2>
        <form onSubmit={handleSubmit} className="mx-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Sinopsis:</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="text"
              value={sinopsis}
              onChange={(e) => setSinopsis(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tags:</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Categoría:</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Autor:</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Imagen:</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="text"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormEditNoticiaPage;
