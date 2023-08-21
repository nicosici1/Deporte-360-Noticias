import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function RegisterPage() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const verificaUserExist = async () => {
      try {
        const response = await fetch(`http://localhost:2222/api/cuentas/exists?userName=${userName}`);
        const data = await response.json();
        setError(data.exists);
      } catch (error) {
        console.error(error);
      }
    };
    verificaUserExist();
  }, [userName]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userName === '' || password === '') {
      setError(true);
      return;
    }
    setError(false);

    fetch('http://localhost:2222/api/cuenta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'La cuenta se ha registrado correctamente.',
          });
          response.json();

          navigate('/', { replace: true });
        } else {
          throw new Error('No se pudo registrar la cuenta.');
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'El usuario ya existe',
          text: 'Intenta con otro nombre',
        });
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <form className="w-64 p-4 bg-white rounded shadow" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Usuario
          </label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={handleUsernameChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm mb-2">El usuario ya existe. Por favor, elija otro.</p>
        )}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Registrar
        </button>
      </form>
      <div>
        {error && (
          <p className="text-bold text-red-600 m-4 text-center">Todos los campos son obligatorios</p>
        )}
      </div>
      <div className="m-5">
        <Link to="/">
          <img className="h-8 w-8" src="../src/recursos/flecha.png" alt="flecha" />
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
