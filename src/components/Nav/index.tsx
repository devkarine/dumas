import { useEffect, useRef, useState } from 'react';
import {
  AddressContainer,
  AddressDescription,
  AddressTitle,
  NavIcon,
  NavContainer,
  SearchContainer,
  UserMenuToggle,
  IconContainer,
  NavLeft,
  NavRight,
  TotalCartItensNumber,
  SearchInput,
  MobileIconToggle,
  AddressSelectorToggle,
  AddressInfo,
  AddressToggleIcon,
  NoResults
} from './styled';

import { BsSearch } from 'react-icons/bs';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp
} from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useCart } from '../../contexts/cartContex';
import useDebounce from '../../hooks/useDebounce';
import { Dish } from '../../types/Dish';
import { searchDishes } from '../../service/api/dishes';
import { SearchResults } from '../SearchResults';
import { useInfiniteQuery } from 'react-query';
import { useAuth } from '../../contexts/authContext';
import { UserMenu } from '../UserMenu';
import { routes } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/themeContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { TabletBreakpoint } from '../../consts/breakpoint';
import { AddressSelector } from '../AddressSelector';
import { FaLocationDot } from 'react-icons/fa6';
import secureLocalStorage from 'react-secure-storage';

export const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const { getItemsCount } = useCart();
  const cartItensNumber = getItemsCount();
  const [searchText, setSearchText] = useState('');
  const [inputText, setInputText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [searchResultDishes, setSearchResultDishes] = useState<Dish[]>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { debounce } = useDebounce(400);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { setActiveAddress, activeAddress } = useCart();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const toggleMenu = () => setShowMenu(prev => !prev);
  const closeMenu = () => setShowMenu(false);
  const closeAddressSelector = () => setShowAddressSelector(false);

  useEffect(() => {
    debounce(() => setSearchText(inputText));
  }, [inputText]);

  const closeSearchResults = () => {
    setSearchResultDishes([]);
    setSearchText('');
  };

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    ['searchDishes', searchText],
    ({ pageParam = 1 }) => searchDishes(searchText, pageParam),
    {
      getNextPageParam: lastPage =>
        lastPage && lastPage.meta.current_page < lastPage.meta.total_pages
          ? lastPage.meta.next_page
          : null,
      enabled: searchText.length > 0,
      staleTime: 5 * 60 * 1000
    }
  );

  useEffect(() => {
    if (data) {
      setSearchResultDishes(data?.pages.flatMap(p => (p ? p.data : [])));
    }
  }, [data]);

  useEffect(() => {
    const storedAddress = secureLocalStorage.getItem('activeAddress');
    if (storedAddress) {
      setActiveAddress(JSON.parse(storedAddress as string));
    } else {
      if (user && user.addresses?.length) {
        if (!activeAddress) {
          setActiveAddress(user.addresses[0]);
        }
      }
    }
  }, [user]);

  const isTablet = useMediaQuery(`(max-width: ${TabletBreakpoint})`);

  return (
    <>
      <NavContainer>
        <NavLeft>
          {isTablet ? (
            <MobileIconToggle>
              <GiHamburgerMenu onClick={toggleMenu} />
            </MobileIconToggle>
          ) : theme === 'light' ? (
            <NavIcon
              onClick={() => navigate(routes.home)}
              src="/images/logo.svg"
            />
          ) : (
            <NavIcon
              onClick={() => navigate(routes.home)}
              src="/images/logo_dark.svg"
            />
          )}
          <AddressContainer>
            {activeAddress ? (
              <>
                <AddressToggleIcon>
                  <FaLocationDot />
                </AddressToggleIcon>
                <AddressInfo
                  onClick={() => setShowAddressSelector(prev => !prev)}
                >
                  <AddressTitle>{activeAddress.name}</AddressTitle>
                  <AddressDescription>{`${activeAddress.public_place}, ${activeAddress.number}`}</AddressDescription>
                </AddressInfo>
                <AddressSelectorToggle>
                  {showAddressSelector ? (
                    <MdOutlineKeyboardArrowUp />
                  ) : (
                    <MdOutlineKeyboardArrowDown />
                  )}
                </AddressSelectorToggle>

                {showAddressSelector && (
                  <AddressSelector closeSelector={closeAddressSelector} />
                )}
              </>
            ) : (
              <AddressTitle>Cadastre um endereço</AddressTitle>
            )}
          </AddressContainer>
        </NavLeft>
        <NavRight>
          <SearchContainer open={openSearch}>
            {openSearch && (
              <SearchInput
                type="text"
                ref={inputRef}
                onChange={handleSearchChange}
                value={inputText}
                onBlur={() => {
                  if (!searchResultDishes?.length) setInputText('');
                }}
              />
            )}
            <BsSearch
              onClick={() => {
                setOpenSearch(prev => !prev);
              }}
            />
            {searchText &&
              (searchResultDishes?.length ? (
                <>
                  <SearchResults
                    closeResults={closeSearchResults}
                    dishes={searchResultDishes}
                    fetchNextPage={() => {
                      hasNextPage && fetchNextPage();
                    }}
                    isFetching={isFetching}
                  />
                </>
              ) : (
                <NoResults>Sua pesquisa não retornou resultados</NoResults>
              ))}
          </SearchContainer>

          <UserMenuToggle onClick={toggleMenu}>
            {user?.name}
            {showMenu ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </UserMenuToggle>
          {showMenu && <UserMenu closeMenu={closeMenu} />}
          <IconContainer onClick={() => navigate(routes.cart)}>
            {cartItensNumber ? (
              <TotalCartItensNumber>{cartItensNumber}</TotalCartItensNumber>
            ) : null}
            <FaShoppingCart />
          </IconContainer>
        </NavRight>
      </NavContainer>
    </>
  );
};
