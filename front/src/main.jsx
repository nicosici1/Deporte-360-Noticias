import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Error404 from './componentes/Error404.jsx';
// import LoginPage from './Page/LoginPage.jsx';
import NoticiasPage from './Page/NoticiasPage.jsx';
import RegisterPage from './Page/RegisterPage.jsx';
import NoticiaDetailPage from './Page/NoticiasDetailPage.jsx';
import CreateNoticiaPage from './Page/CreateNoticiaPage.jsx';
import FormEditNoticiaPage from './Page/FormEditNoticiaPage.jsx';
import DeleteNoticiaPage from './Page/DeleteNoticiaPage.jsx';
import RoutePrivate from './componentes/RoutePrivate.jsx';  
import AdminPage from './Page/AdminPage.jsx'
import ProfilePage from './Page/ProfilePage.jsx';
import CreateLigaPage from './Page/CreateLigaPage.jsx';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';

const routes = [
  {
    path: '/',
    element:  <App />  ,
    errorElement: <Error404 />,
  },
 
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/noticias',
    element: <RoutePrivate> <NoticiasPage />, </RoutePrivate>
  },
  {
    path: '/noticias/:idNoticia',
    element: <NoticiaDetailPage />,
  },
  {
    path: '/noticias/new',
    element: <CreateNoticiaPage />,
  },
  {
    path: '/ligas',
    element: <CreateLigaPage />,
  },
  {
    path: '/noticias/:idNoticia/edit',
    element: <FormEditNoticiaPage />,
  },
  {
    path: '/noticias/:idNoticia/delete',
    element: <DeleteNoticiaPage />,
  },
  {
    path: '/administrador',
    element: <AdminPage />
  },
  {
    path: '/perfil',
    element: <ProfilePage />
  }
];

const router = createBrowserRouter(routes);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/noticias">Noticias</Link>
          </li>
          <li>
            <Link to="/noticias/:idNoticia">Detalle de la Noticia</Link>
          </li>
          <li>
            <Link to="/perfil">Profile</Link>
          </li>
          <li>
            <Link to="/noticias/new">Crear Noticias</Link>
          </li>
          <li>
            <Link to="/ligas">Crear Liga</Link>
          </li>
          <li>
            <Link to="/noticias/:idNoticia/edit">Editar Noticia</Link>
          </li>
          <li>
            <Link to="/noticias/:idNoticia/delete">Eliminar Noticia</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" element={<App />} />
    </RouterProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


