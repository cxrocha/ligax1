import React from 'react';
import { useTheme } from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

export function Load() {
  const theme = useTheme();

  return (
    <ActivityIndicator
      color={theme.COLORS.BACKGROUND_DARK}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    />
  );
}