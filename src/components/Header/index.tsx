import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components/native';
import Brasao from '../../assets/images/Brasao.png'
import happyEmoji from '../../assets/images/happy.png'
import React from 'react';
import { Container, HeaderContainer, ImageLogo, LoginLogout, Greeting, 
         GreetingEmoji, GreetingText, Icon, Title} from "./styles"

type Props = {title: string}         

export function Header({title, ...rest}: Props) {
    const { COLORS } = useTheme();
    const { user, signOut } = useAuth()
    const navigation = useNavigation();
    
    function handleLogin() {
        navigation.navigate('signIn');
      };

    return (
      <Container>
        <HeaderContainer>
            <ImageLogo source={Brasao}/>
            { user?.id ? (
            <LoginLogout>
                <Greeting>
                  <GreetingEmoji source={happyEmoji} />
                  <GreetingText>Olá, {user.name}</GreetingText>
                </Greeting>
                <TouchableOpacity onPress={signOut}>
                  <Icon name="log-out" color={COLORS.TEXT_LIGHT} size={24} />
                </TouchableOpacity>
            </LoginLogout>
            ) : (<LoginLogout>
                <TouchableOpacity onPress={handleLogin}>
                    <Icon name="log-in" color={COLORS.TEXT_LIGHT} size={24} />
                </TouchableOpacity>
                </LoginLogout>
            )}
        </HeaderContainer>
        <Title>{title}</Title>
      </Container>
    )
}