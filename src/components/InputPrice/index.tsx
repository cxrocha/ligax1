import React from "react";
import { TextInputProps } from 'react-native';

import { Container, Size, Label, Input } from './styles';

export function InputPrice({ ...rest }: TextInputProps) {
  return (
    <Container>
      <Label>R$</Label>

      <Input keyboardType="numeric" {...rest} />
    </Container>
  )
}