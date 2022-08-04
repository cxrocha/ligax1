import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { ButtonConfirm } from '../../components/ButtonConfirm';

// import { Container } from './styles';

export function Profile() {
  return (
  <View>
    <Text>Perfil</Text>
    <TextInput 
      placeholder='Nome'
    />
    <TextInput 
      placeholder="Sobrenome"
    />
    <ButtonConfirm
      title="Salvar"
      onPress={()=>{}} />
  </View>
  );
}

