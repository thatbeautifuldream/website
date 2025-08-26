'use client';

import { useControls } from 'leva';
import { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export function InteractiveOtpInput() {
  const [value, setValue] = useState('');
  const { maxLength, successOtp } = useControls({
    maxLength: {
      value: 4,
      min: 4,
      max: 8,
      step: 1,
    },
    successOtp: '1234',
  });

  const slots = Array.from({ length: maxLength }, (_, index) => (
    <InputOTPSlot index={index} key={`slot-${index + 1}`} />
  ));

  return (
    <InputOTP
      maxLength={maxLength}
      onChange={setValue}
      onComplete={() => {
        console.table({ value, successOtp });
        if (Number(value) === Number(successOtp)) {
          console.log('OTP completed:', value);
        } else {
          console.log('OTP incorrect:', value);
        }
      }}
      value={value}
    >
      <InputOTPGroup>{slots}</InputOTPGroup>
    </InputOTP>
  );
}
