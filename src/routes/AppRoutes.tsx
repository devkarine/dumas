import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '.';
import { Home } from '../pages/Home';
import { PageLayout } from '../pages/PageLayout';
import { Login } from '../pages/Login';
import { MainLayout } from '../components/MainLayout';

import { SignUp } from '../pages/SignUp';
import { PasswordRecovery } from '../pages/RecoveryPassword';
import { ProductDetails } from '../pages/ProductDetails';
import { useAuth } from '../contexts/authContext';
import { Profile } from '../pages/Profile/';
import { Cart } from '../pages/Cart';
import { Checkout } from '../pages/Checkout';
import { RateDishes } from '../pages/RateDishes';

export const AppRoutes = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <div>Loading</div>;

  if (isAuthenticated && !user) return <div>Loading</div>;

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path={routes.home} element={<PageLayout />}>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.dish()} element={<ProductDetails />} />
            <Route path={routes.cart} element={<Cart />} />
            <Route path={routes.profile} element={<Profile />} />
            <Route path={routes.checkout} element={<Checkout />} />
            <Route path={routes.rating} element={<RateDishes />} />
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
          <Route path={routes.recoverPassword} element={<PasswordRecovery />} />
          <Route path="*" element={<Navigate to={routes.login} />} />
        </Route>
      )}
    </Routes>
  );
};

//TODO: Adicionar pages de acordo com a criação das mesmas
