import styled, { css } from 'styled-components/native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const BackBar = styled.View`    
  align-items: flex-start;
  margin-top: ${getStatusBarHeight()}px;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND_DARK};
  height: ${RFValue(40)}px;
`;

export const Content = styled.View`
  width: 100%;
  padding: 0 32px;
  justify-items: center;
  align-items: center;
`;

export const Title = styled.Text`
  align-self: flex-start;
  font-size: 32px;
  margin-bottom: 16px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TEXT_DARK};
  `};
`;

export const Brand = styled.Image.attrs({
  resizeMode: 'contain'
})`
  height: ${RFValue(150)}px;
  width: ${RFValue(200)}px;
  align-self: center;
  margin-top: ${RFValue(12)}px;;
  margin-bottom: ${RFValue(12)}px;;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 20px;
`;

export const ForgotPasswordLabel = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `};
`;

export const Footer = styled.View`    
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px; 
`;

export const FooterWrapper = styled.View`
    margin-top: ${RFPercentage(+4)}px;
    padding: 0 ${RFValue(32)}px;
    justify-content: space-between;
    align-items: center;
`;