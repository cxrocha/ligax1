import React from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

type Props = {title: string, data: string};

export function TitleDataText({title, data}: Props) {
  return (
    <Container>
      <Text>{title}</Text>
      <Text>{data}</Text>
    </Container>
    )
}