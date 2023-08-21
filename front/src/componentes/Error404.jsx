 
import { Link } from 'react-router-dom';
import ballImage from '../recursos/pelota.png';

const Error404Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      <h1 className="text-9xl font-bold text-center mb-6 flex flex-row">
        <span className="text-green-700">4</span>
        <span className="flex items-center">
          <img src={ballImage} alt="Pelota" className="animate-bounce mx-5 w-24" />
        </span>
        <span className="text-green-700">4</span>
      </h1>
      <p className="text-xl mt-6">La página que estás buscando no existe.</p>
      <Link to="/noticias" className="text-blue-500 hover:underline mt-6">Volver a noticias</Link>
    </div>
  );
};

export default Error404Page;
