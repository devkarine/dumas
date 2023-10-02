import { useState } from 'react';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';

export const PasswordRecovery = () => {
  const [step, setStep] = useState(1);
  const [resetPasswordToken, setResetPasswordToken] = useState('');

  const handleStepOneSuccess = (resetToken: string) => {
    setResetPasswordToken(resetToken);
    setStep(2);
  };

  return (
    <>
      {step === 1 && <StepOne onSuccess={handleStepOneSuccess} />}
      {step === 2 && <StepTwo resetPasswordToken={resetPasswordToken} />}
    </>
  );
};
