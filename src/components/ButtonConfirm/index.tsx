import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { Container, Title, Load } from './styles';

interface Props {
  title: string;
  isLoading?: boolean;
  onPress: () => void;
};

export function ButtonConfirm({title, isLoading = false, onPress}: Props) {
  return (
    <Container  disabled={isLoading} onPress={onPress}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  )
}