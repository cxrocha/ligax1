import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { Container, Title } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: ()=>void;
}

export function BackButton({ title, icon, onPress }: Props) {
  const theme = useTheme();

  return (
    <Container onPress={onPress}>
      <MaterialIcons name={icon} size={32} color={theme.COLORS.WHITE} />
      <Title>{title}</Title>
    </Container>
  );
}