function FiltroLigas({ categorias, filtroLiga, filtrarNoticias }) {
  return (
    <div className="flex flex-wrap justify-center md:flex-row md:gap-4">
      <div className="flex flex-col md:flex-row w-full md:w-auto mx-2">
        <button
          onClick={() => filtrarNoticias("")}
          className={`p-2 border   mx-1 my-1 border-gray-400 rounded-lg focus:outline-none ${
            filtroLiga === "" ? "bg-gray-800 text-white" : ""
          }`}
        >
          Todas las ligas
        </button>
        {categorias.map((categoria) => (
          <button
            key={categoria._id}
            onClick={() => filtrarNoticias(categoria._id)}
            className={`p-2 mx-1 my-1   border border-gray-400 rounded-lg focus:outline-none ${
              filtroLiga === categoria._id ? "bg-gray-800 text-white" : ""
            }`}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FiltroLigas;


