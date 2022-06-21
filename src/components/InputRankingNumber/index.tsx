import React from "react";
import { TextInputProps } from 'react-native';

import { Container, Input } from './styles';

export function InputRankingNumber({  ...rest }: TextInputProps) {
  return (
    <Container>
      <Input keyboardType="numeric" {...rest} />
    </Container>
  )
}