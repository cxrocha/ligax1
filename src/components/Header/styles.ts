import styled, {css} from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  padding-top: ${getStatusBarHeight()}px;
`;

export const HeaderContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;    
    padding: ${RFValue(25)}px;
    padding-bottom: 0px;
    align-items: center;
`;

export const ImageLogo = styled.Image`
  width: ${RFValue(70)}px;
  height: ${RFValue(70)}px;
  border-radius: 5px;
`;

export const LoginLogout = styled.View`
    height: ${RFValue(70)}px;
    justify-content: space-between;
`;

export const Greeting = styled.View`
  width: ${RFValue(120)}px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_DARK};
  border-radius: 10px;
  align-items: center;
  padding: 5px;
`;

export const GreetingEmoji = styled.Image`
  height: ${RFValue(24)}px;
  width: ${RFValue(24)}px;
  margin-right: 5px;
`;

export const GreetingText = styled.Text`
  font-size: ${RFValue(16)}px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `};
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    align-self: flex-end;
    color: ${({theme}) =>theme.COLORS.BACKGROUND_DARK};
`;

export const Title = styled.Text`
    font-size: ${RFValue(24)}px;  
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    color: ${({ theme }) => theme.COLORS.TEXT_DARK};
    text-align: center;
`; 