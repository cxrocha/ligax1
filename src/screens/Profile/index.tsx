import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

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
    <Button 
      title="Salvar"
      onPress={()=>{}} />
  </View>
  );
}

