import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
    font-size: ${RFValue(24)}px;
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    color: ${({ theme }) => theme.COLORS.TEXT_DARK};
    text-align: center;
`; 

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT
}))`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${getStatusBarHeight() + 33}px 24px 38px;
`;

export const Greeting = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GreetingEmoji = styled.Image`
  height: 32px;
  width: 32px;
  margin-right: 12px;
`;

export const GreetingText = styled.Text`
  font-size: 20px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `};
`;

export const ButtonContainer = styled.View`
padding: 10px;
`;

export const BackBar = styled.View`    
  align-items: flex-start;
  margin-top: ${getStatusBarHeight()}px;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND_DARK};
  height: ${RFValue(40)}px;
`;

