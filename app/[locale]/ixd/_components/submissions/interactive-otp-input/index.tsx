'use client';

import { useControls } from 'leva';
import { CheckIcon } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Section } from '@/components/section';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export function InteractiveOtpInput() {
  const [value, setValue] = useState('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const { maxLength, successOtp } = useControls({
    maxLength: {
      value: 4,
      min: 4,
      max: 8,
      step: 1,
    },
    successOtp: '1234',
  });

  // when input is not the same length of the maxInput then reset the success state
  useEffect(() => {
    if (value.length !== maxLength) {
      setIsSuccess(null);
    }
  }, [value, maxLength]);

  const handleComplete = () => {
    if (Number(value) === Number(successOtp)) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  const slots = Array.from({ length: maxLength }, (_, index) => (
    <InputOTPSlot
      aria-invalid={isSuccess === false}
      index={index}
      key={`slot-${index + 1}`}
    />
  ));

  return (
    <AnimatePresence mode="wait">
      <div className="relative">
        {isSuccess ? (
          <Section
            className="flex h-10 items-center justify-center"
            key="success-state"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CheckIcon className="h-4 w-4" />
            </div>
            <p className="font-medium text-primary text-sm">
              OTP Verification Successful!
            </p>
          </Section>
        ) : (
          <Section className="relative" key="otp-input">
            <InputOTP
              maxLength={maxLength}
              onChange={setValue}
              onComplete={handleComplete}
              value={value}
            >
              <InputOTPGroup>{slots}</InputOTPGroup>
            </InputOTP>
          </Section>
        )}
        {isSuccess === false && (
          <Section
            className="flex h-10 items-center justify-center"
            key="error-state"
          >
            <p className="font-medium text-destructive text-sm">Wrong OTP!</p>
          </Section>
        )}
      </div>
    </AnimatePresence>
  );
}
