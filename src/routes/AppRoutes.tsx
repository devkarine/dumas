import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '.';
import { Home } from '../pages/Home';
import { PageLayout } from '../pages/PageLayout';
import { Login } from '../pages/Login';
import { MainLayout } from '../components/MainLayout';
import { useAuth } from '../contexts/authContext';
import { SignUp } from '../pages/SignUp';
import { ForgotPassword } from '../pages/ForgotPassword';

export const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading</div>;
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path={routes.home} element={<PageLayout />}>
            <Route path={routes.home} element={<Home />} />
            <Route
              path={routes.dish()}
              element={<h1>Dish detail Placeholder</h1>}
            />
          </Route>
          <Route path="*" element={<Navigate to={routes.home} />} />
          <Route></Route>
        </>
      ) : (
        <Route element={<MainLayout />}>
          <Route path={routes.login} element={<Login />} />

          <Route path={routes.signUp.profile} element={<SignUp />} />
          <Route
            path={routes.signUp.address}
            element={<h1>Add Address placeholder</h1>}
          />
          <Route path={routes.recoverPassword} element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to={routes.login} />} />
        </Route>
      )}
    </Routes>
  );
};

//TODO: Adicionar pages de acordo com a criação das mesmas
