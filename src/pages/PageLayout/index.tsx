import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Nav';
import { PageContainer } from './styled';
import { Footer } from '../../components/Footer';

export const PageLayout = () => {
  return (
    <PageContainer>
      <Navbar />
      <Outlet />
      <Footer />
    </PageContainer>
  );
};
