import { useEffect, useRef } from 'react';

import { MenuContainer, MenuItem } from './styled';
import { routes } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/themeContext';
import { useAuth } from '../../contexts/authContext';
import { FaHome, FaMoon, FaSignOutAlt, FaSun, FaUserAlt } from 'react-icons/fa';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { TabletBreakpoint } from '../../consts/breakpoint';
import { closeOnClickOutside } from '../../utils/closeOnClickOutside';

interface UserMenuProps {
  closeMenu: () => void;
}

export const UserMenu = ({ closeMenu }: UserMenuProps) => {
  const { toggle, theme } = useTheme();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const menuRef = useRef(null);

  useEffect(() => {
    const listener = (e: MouseEvent) =>
      closeOnClickOutside(e, menuRef, closeMenu);
    document.addEventListener('click', listener, true);
    return () => {
      document.removeEventListener('click', listener, true);
    };
  }, []);

  const isMobile = useMediaQuery(`(max-width: ${TabletBreakpoint})`);
  return (
    <MenuContainer ref={menuRef}>
      {isMobile && (
        <MenuItem
          onClick={() => {
            navigate(routes.home);
            closeMenu();
          }}
        >
          Home
          <FaHome />
        </MenuItem>
      )}
      <MenuItem
        onClick={() => {
          toggle();
          closeMenu();
        }}
      >
        {theme === 'dark' ? (
          <>
            Modo claro <FaSun />
          </>
        ) : (
          <>
            Modo escuro <FaMoon />
          </>
        )}
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate(routes.profile);
          closeMenu();
        }}
      >
        Perfil
        <FaUserAlt />
      </MenuItem>
      <MenuItem onClick={signOut}>
        Sair <FaSignOutAlt />
      </MenuItem>
    </MenuContainer>
  );
};
