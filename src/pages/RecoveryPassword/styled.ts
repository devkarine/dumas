import { Form } from 'formik';
import { styled } from 'styled-components';
import { media } from '../../consts/mediaquery';

export const Title = styled.h1`
  width: min(384px, 100%);
  font-size: ${({ theme }) => theme.fonts.text.medium};
  font-style: italic;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.text.main};
`;

export const SubTitle = styled.h2`
  width: min(384px, 100%);
  font-size: ${({ theme }) => theme.fonts.text.medium};
  font-style: italic;
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  padding-bottom: 30px;
  color: ${({ theme }) => theme.colors.text.main};

  ${media.mobile`
  font-size: 14px;
  `}
`;

export const FormContainer = styled(Form)`
  width: 50%;
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

export const MessageErrorsContainer = styled.div`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.fonts.text.errorSize};
  text-align: center;
`;
