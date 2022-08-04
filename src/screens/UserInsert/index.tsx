import React from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { AccountForm } from '../../components/Forms/AccountForm';
import { Container, Content, SubTitle, BackButton, BackText } from './styles';

import backgroundImage from '../../assets/images/background.png';


export function UserInsert() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Container>
      <ImageBackground source={backgroundImage} resizeMode='stretch' style={{flex:1}}>          
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Content>

            <SubTitle>Conte conosco, estamos aqui para ajudar.</SubTitle>
            <AccountForm />

            <BackButton onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color={theme.COLORS.PRIMARY} />
              <BackText>Eu já tenho uma conta</BackText>
            </BackButton>
          </Content>
        </KeyboardAvoidingView>
      </ImageBackground>
    </Container>
  );
}