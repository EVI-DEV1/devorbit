import React from 'react';

import { ButtonContainer } from './styles';

const Button = ({
  title,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <ButtonContainer
      variant={variant}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {title}
    </ButtonContainer>
  );
};

export { Button };
