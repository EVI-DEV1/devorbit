import React from 'react';
import { Controller } from 'react-hook-form';

import { InputContainer, InputText, IconContainer, ErrorText, Field } from './styles';

const Input = ({ leftIcon, name, control, rules, errorMessage, ...rest }) => {
  return (
    <Field>
      <InputContainer hasError={!!errorMessage}>
        {leftIcon ? <IconContainer>{leftIcon}</IconContainer> : null}

        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue=""
          render={({ field }) => (
            <InputText
              {...field}
              {...rest}
              value={field.value || ''}
            />
          )}
        />
      </InputContainer>
      {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
    </Field>
  );
};

export { Input };
