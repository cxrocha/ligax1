import React from "react";
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { Container, Input, InputArea, ButtonClear } from './styles';

type Props = TextInputProps & {
  onClear: () => void;
};

export function Search({ onClear, ...rest }: Props) {
  
  return (
    <Container>
      <InputArea>
        <Input placeholder="pesquisar..." {...rest} />
        <ButtonClear onPress={onClear}>
          <Feather name="x" size={16} />
        </ButtonClear>
      </InputArea>
    </Container>
  )
}