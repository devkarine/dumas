import { useState } from 'react';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { User } from '../../types/Users';
import { useAuth } from '../../contexts/authContext';

export const SignUp = () => {
  const [data, setData] = useState<User>({
    id: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    telephones_attributes: [],
    addresses_attributes: []
  });

  const [currentStep, setCurrentStep] = useState(0);
  const { signUp } = useAuth();
  const makeRequest = async (values: User) => {
    await signUp(values);
  };

  const handleNextStep = (newData: User, final = false) => {
    setData(prev => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData);
      return;
    }
    setCurrentStep(prev => prev + 1);
  };
  const handlePrevStep = (newData: User) => {
    setData(prev => ({ ...prev, ...newData }));
    setCurrentStep(prev => prev - 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo
      next={handleNextStep}
      prev={handlePrevStep}
      data={data}
      setData={setData}
    />
  ];

  return <div>{steps[currentStep]}</div>;
};

export interface StepProps {
  next: (values: User, final?: boolean) => void;
  prev?: (values: User) => void;
  data: User;
  setData?: React.Dispatch<React.SetStateAction<User>>;
}
