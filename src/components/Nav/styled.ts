import styled from 'styled-components';
import { media } from '../../consts/mediaquery';
import { TabletBreakpoint } from '../../consts/breakpoint';

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-bottom: 4px solid ${({ theme }) => theme.colors.border.main};
  background-color: ${({ theme }) => theme.colors.background.main};
  padding: 0 32px;

  ${media.tablet`
  padding: 0 12px;
    
  `}
`;

export const NavLeft = styled.div`
  flex: 3;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 80px;

  ${media.tablet`
    gap: 20px;
  `}
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 32px;
  height: 100%;
  flex: 3;
`;

export const AddressToggleIcon = styled.div`
  color: ${({ theme }) => theme.colors.text.primaryAccent};
  svg {
    margin-top: 5px;
    width: 24px;
    height: 24px;
  }
  ${media.desktop`
    display: none;

    
  `}
`;
export const AddressSelectorToggle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.colors.text.primaryAccent};
    width: 18px;
    height: 18px;
  }
`;
export const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  ${media.tablet`
    display: none;
  `}
`;

export const AddressContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 4px;
  position: relative;

  ${media.tablet`
    gap:0
  `}
`;

export const NavIcon = styled.img`
  height: 100%;
  padding: 8px 0;
  color: ${({ theme }) => theme.colors.text.primaryAccent};
  cursor: pointer;
`;

export const AddressTitle = styled.span`
  color: ${({ theme }) => theme.colors.text.primaryAccent};
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  line-height: normal;
  cursor: pointer;
`;

export const AddressDescription = styled.span`
  color: ${({ theme }) => theme.colors.text.secondaryAccent};
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  line-height: normal;
  cursor: pointer;
`;

interface SearchContainerProps {
  open: boolean;
}
export const SearchContainer = styled.div<SearchContainerProps>`
  border-radius: 30px;
  border: 2px solid
    ${({ theme, open }) => (open ? theme.colors.border.main : 'none')};
  height: 50px;
  width: ${({ open }) => (open ? '340px' : '80px')};
  background-color: ${({ theme, open }) =>
    open ? theme.colors.white : 'none'};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  cursor: pointer;
  transition: 500ms;

  @media (max-width: ${TabletBreakpoint}) {
    width: ${({ open }) => (open ? '240px' : '30px')};
    height: 30px;
    border-radius: 15px;
    padding-right: 2px;
  }
  input {
    color: ${({ theme }) => theme.colors.black};
  }
  svg {
    color: ${({ theme }) => theme.colors.text.primaryAccent};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.background.main};
    padding: 6px;
    width: 38px;
    height: 38px;
    border: 1px solid ${({ theme }) => theme.colors.border.main};

    ${media.tablet`
    width: 24px;
    height: 24px;
    padding: 2px;
    `}
  }
`;

export const UserMenuToggle = styled.span`
  color: ${({ theme }) => theme.colors.text.primaryAccent};
  display: flex;
  gap: 2px;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-weight: ${({ theme }) => theme.fonts.weight.semiBold};
  cursor: pointer;
  padding-right: 12px;
  border-right: 1px solid ${({ theme }) => theme.colors.border.main};
  height: 80%;
  position: relative;

  ${media.tablet`
    display: none;
  `}
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.colors.text.primaryAccent};
    width: 32px;
    height: 32px;
  }
`;

export const TotalCartItensNumber = styled.span`
  border-radius: 100%;
  width: 18px;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.text.extraSmall};
  position: absolute;
  top: 12px;
  right: 36px;

  ${media.tablet`
    width: 16px;
    height: 16px;
    right: 16px; 
    top: 12px; 
  `}
`;

export const SearchInput = styled.input`
  width: 80%;
  border: none;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text.main};
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
`;

export const NoResults = styled.div`
  position: absolute;
  top: 72px;
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.text.secondaryAccent};
  width: 600px;
  height: 50px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MobileIconToggle = styled.div`
  svg {
    color: ${({ theme }) => theme.colors.text.primaryAccent};
    width: 32px;
    height: 32px;
    margin-top: 5px;
  }
`;
