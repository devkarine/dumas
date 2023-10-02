import { ErrorMessage, Formik, FormikErrors, FormikHelpers } from 'formik';
import { StepProps } from '.';
import {
  FormContainer,
  InputContainer,
  MessageErrorsContainer,
  SubTitle,
  Title
} from '../Login/styled';
import { messageErrors } from '../../consts/messageErrors';
import { FiHome } from 'react-icons/fi';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { WrapperButton } from './styled';
import { apiRoutes } from '../../routes';
import { User } from '../../types/Users';
import { useAuth } from '../../contexts/authContext';
import { api } from '../../service/api';
import { useEffect, useState } from 'react';
import { getAndUseLocation } from '../../consts/getLocation';
import { Address } from '../../types/Address';
import { DefaultLink } from '../../components/DefaultLink';
import * as Yup from 'yup';

interface Cep {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location: {
    type: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  city_id: string;
}

export const StepTwo: React.FC<StepProps> = ({ prev, next, data, setData }) => {
  const { error } = useAuth();
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [state, setState] = useState<string>();
  const [states, setStates] = useState<{ id: string; name: string }[]>([]);
  const [isLocationSet, setIsLocationSet] = useState(false);

  useEffect(() => {
    const getStates = async () => {
      const response = await api.get(apiRoutes.state.states);
      setStates(response.data.data);
    };
    getStates();
  }, []);

  useEffect(() => {
    const getCities = async () => {
      const data = await api.get(apiRoutes.state.cities(state as string), {
        params: { per_page: 226 }
      });
      setCities(data.data.data);
    };
    getCities();
  }, [state]);

  useEffect(() => {
    const getLocation = async () => {
      const location = await getAndUseLocation();
      if (location) {
        setIsLocationSet(true);
        setData &&
          setData(prev => ({
            ...prev,
            addresses_attributes: [
              {
                latitude: location.latitude,
                longitude: location.longitude
              } as Address
            ]
          }));
      }
    };
    getLocation();
  }, []);

  const handleCepChange = async (
    cep: string,
    values: User,
    setFieldValue: (
      field: string,
      value: string | number,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<User>>
  ) => {
    const cleanedCep = cep.replace(/[^0-9]/g, '');

    if (cleanedCep.length !== 8) {
      alert('CEP deve conter 8 números');
      return;
    }
    try {
      const response = await api.get<Cep>(`/addresses/search_zip_code/${cep}`);

      const { data } = response;
      if (!isLocationSet) {
        setFieldValue(
          'addresses_attributes[0].latitude',
          data.location.coordinates.latitude
        );
        setFieldValue(
          'addresses_attributes[0].longitude',
          data.location.coordinates.longitude
        );
      }
      setFieldValue('addresses_attributes[0].neighborhood', data.neighborhood);
      setFieldValue('addresses_attributes[0].public_place', data.street);
      setCities(prev => [...prev, { id: data.city_id, name: data.city }]);
      setStates(prev => [...prev, { id: 'stateFromCep', name: data.state }]);
      setFieldValue('addresses_attributes[0].city_id', data.city_id);
      setFieldValue('addresses_attributes[0].state', 'stateFromCep');
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };
  const validation = Yup.object().shape({
    addresses_attributes: Yup.array().of(
      Yup.object({
        zip_code: Yup.string()
          .matches(
            /^\d{8}$/,
            messageErrors.addresses_attributes.zip_code.invalid
          )
          .required(messageErrors.addresses_attributes.zip_code.required),
        public_place: Yup.string().required(
          messageErrors.addresses_attributes.public_place.required
        ),
        neighborhood: Yup.string().required(
          messageErrors.addresses_attributes.neighborhood.required
        ),
        number: Yup.string().required(
          messageErrors.addresses_attributes.number.required
        ),
        city_id: Yup.string().required(
          messageErrors.addresses_attributes.city_id.required
        )
      })
    )
  });
  const handleSubmit = (
    values: User,
    { setSubmitting }: FormikHelpers<User>
  ) => {
    next(values, true);
    setSubmitting(false);
  };

  const initialValues = {
    ...data,
    addresses_attributes: [
      {
        name: 'Endereço Principal',
        zip_code: '',
        public_place: '',
        neighborhood: '',
        number: '',
        city_id: '',
        reference: '',
        complement: ''
      }
    ]
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount={true}
      validationSchema={validation}
      enableReinitialize
    >
      {({ values, isSubmitting, isValid, setFieldValue }) => (
        <FormContainer>
          <Title>Cadastro</Title>
          <SubTitle>Endereço</SubTitle>

          <InputContainer>
            <Input
              Icon={FiHome}
              placeholder="CEP"
              name="addresses_attributes[0].zip_code"
              onBlur={e =>
                handleCepChange(e.target.value, values, setFieldValue)
              }
            />
            <ErrorMessage
              name="addresses_attributes[0].zip_code"
              component={MessageErrorsContainer}
            />

            <Input
              Icon={FiHome}
              placeholder="Rua"
              name="addresses_attributes[0].public_place"
            />
            <ErrorMessage
              name="addresses_attributes[0].public_place"
              component={MessageErrorsContainer}
            />
            <Input
              Icon={FiHome}
              placeholder="Bairro"
              name="addresses_attributes[0].neighborhood"
            />
            <ErrorMessage
              name="addresses_attributes[0].neighborhood"
              component={MessageErrorsContainer}
            />
            <Input
              Icon={FiHome}
              placeholder="Número"
              name="addresses_attributes[0].number"
            />
            <ErrorMessage
              name="addresses_attributes[0].number"
              component={MessageErrorsContainer}
            />
            <Input
              Icon={FiHome}
              placeholder="Cidade"
              name="addresses_attributes[0].city_id"
              as="select"
            >
              {cities.length &&
                cities.map(city => (
                  <option value={city.id}>{city.name}</option>
                ))}
            </Input>
            <ErrorMessage
              name="addresses_attributes[0].city_id"
              component={MessageErrorsContainer}
            />
            <Input
              onChange={e => setState(e.target.value)}
              Icon={FiHome}
              placeholder="Estado"
              name="addresses_attributes[0].state"
              as="select"
            >
              {states.length &&
                states.map(state => (
                  <option value={state.id}>{state.name}</option>
                ))}
            </Input>

            <Input
              Icon={FiHome}
              placeholder="Referência"
              name="addresses_attributes[0].reference"
            />
            <Input
              Icon={FiHome}
              placeholder="Complemento"
              name="addresses_attributes[0].complement"
            />
            {error && <MessageErrorsContainer>{error}</MessageErrorsContainer>}
            <WrapperButton>
              <Button
                variant="secondary"
                size="large"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                Salvar
              </Button>
            </WrapperButton>
          </InputContainer>
          <DefaultLink
            to={''}
            variant="primary"
            onClick={() => prev && prev(data)}
          >
            Voltar
          </DefaultLink>
        </FormContainer>
      )}
    </Formik>
  );
};
