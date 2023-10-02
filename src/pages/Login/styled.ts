import { Form } from 'formik';
import { styled } from 'styled-components';
import { media } from '../../consts/mediaquery';

export const Title = styled.h1`
  width: 350px;
  font-size: ${({ theme }) => theme.fonts.text.medium};
  font-style: italic;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.text.main};

  ${media.mobile`
    font-size: 14px;
    width: 249px;
  `}
`;

export const SubTitle = styled.h2`
  width: 350px;
  font-size: ${({ theme }) => theme.fonts.text.medium};
  font-style: italic;
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  padding-bottom: 30px;
  color: ${({ theme }) => theme.colors.text.main};

  ${media.mobile`
    font-size: 14px;
    width: 249px;
  `}
`;

export const FormContainer = styled(Form)`
  width: 100%;
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 16px;
`;

export const Paragrafo = styled.p`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.text.medium};
  font-style: italic;
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  color: ${({ theme }) => theme.colors.text.main};
  gap: 5px;

  ${media.mobile`
  font-size: 14px;
  flex-direction: column;
  `}
`;

export const WrapperLink = styled.span`
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
`;
export const MessageErrorsContainer = styled.div`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.fonts.text.errorSize};
  text-align: center;
`;
