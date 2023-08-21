 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const MenuNavegacion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserRole(decodedToken.rol);
    }
  }, [userRole]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isAdmin = userRole === 'admin';
  const isEditor = userRole === 'editor';
 

  return (


    <nav className="bg-gray-800 rounded mb-5 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="/src/recursos/logoCopa.png"
                alt="Logo"
              />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/noticias"
                className="text-gray-300 hover:bg-gray-700 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Noticias
              </Link>
              {isAdmin ? (
                <Link
                  to="/noticias/new"
                  className="text-gray-300 hover:bg-gray-700 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Crear noticia
                </Link>
              ) : null}
              {isAdmin ? (
                <Link
                  to="/ligas"
                  className="text-gray-300 hover:bg-gray-700 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Crear Liga
                </Link>
              ) : null}
              {isAdmin ? (
                <Link
                  to="/administrador"
                  className="text-gray-300 hover:bg-gray-700 hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Administración
                </Link>
              ) : null}
              <Link
                to="/perfil "
                className="text-gray-300 hover:bg-gray-700 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Perfil
              </Link>
              <Link
                to="/ "
                className="text-gray-300 hover:bg-gray-700 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Cerrar sesión
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-green-400 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex-grow" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/noticias"
              className="text-gray-300 hover:bg-gray-700 hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium"
            >
              Noticias
            </Link>
            {(isAdmin || isEditor) && (
              <Link
                to="/noticias/new"
                className="text-gray-300 hover:bg-gray-700  hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Crear noticia
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/administrador"
                className="text-gray-300 hover:bg-gray-700  hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Administración
              </Link>
            )}
            <Link
              to="/login"
              className="text-gray-300 hover:bg-gray-700  hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium"
            >
              Cerrar sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MenuNavegacion;

 