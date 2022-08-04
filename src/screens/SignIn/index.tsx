import React, { useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { Input } from '../../components/Input';

import {
  Container,
  BackBar,
  Content,
  Title,
  Footer,
  Brand,
  FooterWrapper,
} from './styles';
import { FooterButton } from '../../controllers/FooterButton';
import Brasao from '../../assets/images/Brasao.png'
import { BackButton } from '../../controllers/BackButton';
import { useTheme } from 'styled-components/native';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';

import backgroundImage from '../../assets/images/background.png';
import { ButtonConfirm } from '../../components/ButtonConfirm';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, isLogging, forgotPassword, 
    signInWithGoogle, 
    //signInWithApple 
  } = useAuth();

  const navigation = useNavigation();

  const theme = useTheme();

// Login de autenticação com o Firebase
  function handleSignIn() {
    signIn(email, password);
    navigation.goBack();
  }

  function handleForgotPassword() {
    forgotPassword(email);
  }

  function handleCallUserRegister() {
    navigation.navigate('userRegister');
  }

// Login de autenticação com o Google  
  async function handleSignInWithGoogle() {
      setIsLoading(true);
      try {
          await signInWithGoogle();
      } catch (error) {
          console.log(error);
          Alert.alert('Não foi possível conectar a conta Google');
      }
      setIsLoading(false);
      navigation.goBack();
  }

/*
  async function handleSignInWithApple() {
      setIsLoading(true);
      try {
          return await signInWithApple();
      } catch (error) {
          console.log(error);
          Alert.alert('Não foi possível conectar a conta Apple');
          setIsLoading(false);
      }
  }
*/



  return (
    <Container>
      <ImageBackground source={backgroundImage} resizeMode='stretch' style={{flex:1}}>          
        <BackBar>
          <BackButton title="Voltar" icon="arrow-back" onPress={() => navigation.goBack()} />
        </BackBar>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Content>
              <Brand source={Brasao} />
              <Title>Login</Title>

              <Input
                placeholder="E-mail"
                type="primary"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setEmail}
              />

              <Input
                placeholder="Senha"
                type="primary"
                secureTextEntry
                onChangeText={setPassword}
              />

              <ButtonConfirm
                title="Entrar"
                onPress={handleSignIn}
                isLoading={isLogging}
              />

              <Footer>
                <FooterButton title="Criar conta" icon="person-add" onPress={handleCallUserRegister} />
                <FooterButton title="Esqueci senha" icon="email" onPress={handleForgotPassword} />
              </Footer>
              <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    {Platform.OS === 'ios' && (
                        <SignInSocialButton
                            title="Entrar com Apple"
                            svg={AppleSvg}
//                            onPress={handleSignInWithApple}
                        />
                    )}
                </FooterWrapper>
                {isLoading && (
                    <ActivityIndicator
                        color={theme.COLORS.SHAPE}
                        style={{
                            marginTop: 18
                        }}
                    />
                )}

          </Content>
        </KeyboardAvoidingView>
      </ImageBackground>
    </Container>
  );
}