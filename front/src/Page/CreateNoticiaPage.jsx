import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuNavegacion from '../componentes/MenuNavegacion';

const CreateNoticiaPage = () => {
  const [nombre, setNombre] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tags, setTags] = useState('');
  const [categoria, setCategoria] = useState('');
  const [autor, setAutor] = useState('');
  const [liga, setLiga] = useState(''); //AGREGADO ULTIMOOOO
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
         const noticia = {
        nombre: nombre,
        sinopsis: sinopsis,
        descripcion: descripcion,
        imagen: imagen,
        autor: autor,
        tags: tags,
        categoria: categoria,
        fecha_publicacion: new Date().toISOString(),
        comentarios: [],
        liga: liga
        
      };
      // Realizar la solicitud POST al servidor utilizando fetch
      await fetch('http://localhost:2222/api/noticias/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(noticia)
      })
        .then(response => response.json())  // Devolver la respuesta como JSON
        .then(data => {
          console.log(data);
          navigate('/noticias', { replace: true });
        })
        .catch(error => {
          console.error('Error creating news:', error);
        });


      // Resetear los valores del formulario después de enviar los datos
      setNombre('');
      setSinopsis('');
      setDescripcion('');
      setTags('');
      setCategoria('');
      setAutor('');
      setImagen('');
      setLiga('');
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
      <h2 className="text-2xl font-bold mb-4">Crear Noticia</h2>
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
        {/* AGREGADO ULTIMOO */}
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Liga:</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          value={liga}
          onChange={(e) => setLiga(e.target.value)}
        >
          <option value="1">Serie A</option>
          <option value="2">La Liga</option>
          <option value="3">Brasileirao</option>
          <option value="4">Primera División</option>
          <option value="5">Premier League</option>
        </select>
      </div>

        <div className="mb-4">
        
          <div className="shrink-0 my-2">
            <img className="h-24 w-24 object-cover " src="" alt="Imagen" />
          </div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Imagen :</label>
            <input type="file"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "/>
        
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

export default CreateNoticiaPage;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import MenuNavegacion from '../componentes/MenuNavegacion';

// const CreateNoticiaPage = () => {
//   const [nombre, setNombre] = useState('');
//   const [sinopsis, setSinopsis] = useState('');
//   const [descripcion, setDescripcion] = useState('');
//   const [tags, setTags] = useState('');
//   const [categoria, setCategoria] = useState('');
//   const [autor, setAutor] = useState('');
//   const [imagen, setImagen] = useState(null);
//   const navigate = useNavigate('')

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Crear un objeto FormData para enviar la imagen y otros datos
//       const formData = new FormData();
//       formData.append('nombre', nombre);
//       formData.append('sinopsis', sinopsis);
//       formData.append('descripcion', descripcion);
//       formData.append('tags', tags);
//       formData.append('categoria', categoria);
//       formData.append('autor', autor);
//       formData.append('imagen', imagen);

//       // Realizar la solicitud POST al servidor utilizando fetch
//       await fetch('http://localhost:2222/api/noticias/new', {
//         method: 'POST',
//         headers: {
//           'auth-token': localStorage.getItem('token')
//         },
//         body: formData
//       })
//         .then(response => response.json())  // Devolver la respuesta como JSON
//         .then(data => {
//           console.log(data);
//           navigate('/noticias', { replace: true });
//         })
//         .catch(error => {
//           console.error('Error creating news:', error);
//         });

//       // Resetear los valores del formulario después de enviar los datos
//       setNombre('');
//       setSinopsis('');
//       setDescripcion('');
//       setTags('');
//       setCategoria('');
//       setAutor('');
//       setImagen(null);
//     } catch (error) {
//       // Manejar el error en caso de que ocurra
//       console.error(error);
//     }
//   };

//   const handleImagenChange = (e) => {
//     setImagen(e.target.files[0]);
//   };

//   return (
//     <div>
//       <div>
//         <MenuNavegacion />
//       </div>
//       <div className="max-w-md mx-auto mt-8">
//         <h2 className="text-2xl font-bold mb-4">Crear Noticia</h2>
//         <form onSubmit={handleSubmit} className="mx-4">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
//             <input
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//               type="text"
//               value={nombre}
//               onChange={(e) => setNombre(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Sinopsis:</label>
//             <input
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//               type="text"
//               value={sinopsis}
//               onChange={(e) => setSinopsis(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
//             <textarea
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//               value={descripcion}
//               onChange={(e) => setDescripcion(e.target.value)}
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Tags:</label>
//             <input
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//               type="text"
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Categoría:</label>
//             <input
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//               type="text"
//               value={categoria}
//               onChange={(e) => setCategoria(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Autor:</label>
//             <input
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//               type="text"
//               value={autor}
//               onChange={(e) => setAutor(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <div className="shrink-0 my-2">
//               {imagen && (
//                 <img className="h-24 w-24 object-cover" src={URL.createObjectURL(imagen)} alt="Imagen" />
//               )}
//             </div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Imagen:</label>
//             <input
//               type="file"
//               onChange={handleImagenChange}
//               className="block w-full text-sm text-slate-500
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-full file:border-0
//               file:text-sm file:font-semibold
//               file:bg-violet-50 file:text-violet-700
//               hover:file:bg-violet-100
//             "
//             />
//           </div>
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             type="submit"
//           >
//             Crear
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateNoticiaPage;
