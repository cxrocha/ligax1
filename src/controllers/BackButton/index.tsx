import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { Container, Title } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export function BackButton({ title, icon, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons name={icon} size={32} color={theme.COLORS.WHITE} />
      <Title>{title}</Title>
    </Container>
  );
}