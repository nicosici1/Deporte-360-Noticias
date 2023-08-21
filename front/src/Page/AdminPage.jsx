import { useEffect, useState } from 'react';
import MenuNavegacion from '../componentes/MenuNavegacion.jsx';
import { IoTrashOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2';

const AdminPage = () => {
  const [cuentas, setCuentas] = useState([]);
  const [error, setError] = useState(null);
  const [editingCuenta, setEditingCuenta] = useState(null);
  const [userName, setUserName] = useState('');
  const [rol, setRol] = useState('');
  const [duplicateUserName, setDuplicateUserName] = useState(false);
  const [isUserNameChanged, setIsUserNameChanged] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:2222/api/cuentas`, {
      headers: {
        'auth-token': localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('No se pudieron obtener los Usuarios');
        }
      })
      .then((data) => {
        setCuentas(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const deleteCuenta = (idCuenta) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la cuenta permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:2222/api/cuentas/${idCuenta}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            Swal.fire('¡Cuenta eliminada!', 'La cuenta ha sido eliminada correctamente.', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((error) => {
            console.error('Error al eliminar la cuenta:', error);
            Swal.fire('Error', 'Ha ocurrido un error al eliminar la cuenta.', 'error');
          });
      }
    });
  };

  const openEditModal = (idCuenta) => {
    setEditingCuenta(idCuenta);

    const cuenta = cuentas.find((cuenta) => cuenta._id === idCuenta);
    setUserName(cuenta.userName);
    setRol(cuenta.rol);
    setIsUserNameChanged(false);
  };

  const closeEditModal = () => {
    setEditingCuenta(null);
    setUserName('');
    setRol('');
    setIsUserNameChanged(false);
  };

  const saveCuenta = () => {
    const isDuplicate = cuentas.some((cuenta) => cuenta.userName === userName);

    if (isDuplicate && (userName !== cuentas.find((cuenta) => cuenta._id === editingCuenta).userName)) {
      setDuplicateUserName(true);
      return;
    }

    fetch(`http://localhost:2222/api/cuentas/${editingCuenta}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        rol,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Swal.fire('¡Cuenta actualizada!', 'La cuenta ha sido actualizada correctamente.', 'success');
        closeEditModal();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error('Error al actualizar la cuenta:', error);
        Swal.fire('Error', 'Ha ocurrido un error al actualizar la cuenta.', 'error');
      });
  };

  return (
    <div>
      <div>
        <MenuNavegacion />
      </div>

      <h1 className="text-4xl text-center font-bold my-8">Panel de administración</h1>
      <div className="w-full md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">
        <table className="w-full table-auto bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-800 text-white">Id</th>
              <th className="px-6 py-3 bg-gray-800 text-white">Usuario</th>
              <th className="px-6 py-3 bg-gray-800 text-white">Rol</th>
              <th className="px-6 py-3 bg-gray-800 text-white">Acción</th>
            </tr>
          </thead>
          <p className="text-red-500 my-4 text-center text-bold">{error}</p>
          <tbody>
            {cuentas.map((cuenta, index) => (
              <tr key={cuenta._id} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                <td className="px-6 py-4 text-center">{cuenta._id}</td>
                <td className="px-6 py-4 text-center">{cuenta.userName}</td>
                <td className="px-6 py-4 text-center">{cuenta.rol}</td>
                <td className="px-6 py-4 flex items-center justify-center">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => openEditModal(cuenta._id)}
                  >
                    <FiEdit size={24} />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      deleteCuenta(cuenta._id);
                    }}
                  >
                    <IoTrashOutline size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingCuenta && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex flex-col sm:items-center">
                  <div className="mx-auto flex-shrink-0 flex items-center my-4 justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiEdit className="text-yellow-600 h-20 w-20" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-2xl text-center my-4 mt-2 leading-6 font-medium text-gray-900">Editar cuenta</h3>
                    {duplicateUserName && (
                      <p className="text-red-500 bg-red-200 p-1 text-center rounded"> Imposible actualizar, el usuario ya existe </p>
                    )}
                    <div className="mt-2">
                      <div className="grid grid-cols-1 gap-6">
                        <div className="col-span-6">
                          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                            Nombre de usuario
                          </label>
                          <input
                            type="text"
                            name="userName"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            autoComplete="off"
                            className="mt-1 w-64 focus:ring-indigo-500 h-10 pl-2 focus:border-indigo-500 block shadow-sm sm:text-sm border-solid border-2 border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="rol" className="block text-sm font-medium text-gray-700">
                            Rol
                          </label>
                          <select
                            name="rol"
                            id="rol"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                            className="mt-1 px-4 focus:ring-indigo-500 pl-2 focus:border-indigo-500 h-10 block shadow-sm sm:text-sm rounded-md w-64 border-solid border-2 border-gray-300"
                          >
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="user">User</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={saveCuenta}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Guardar
                </button>
                <button
                  onClick={closeEditModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
