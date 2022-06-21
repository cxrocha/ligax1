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

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48
  },
})`
  width: 100%;
  padding: 0 32px;
`;

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 24px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TEXT_DARK};
  `};
`;

export const Brand = styled.Image.attrs({
  resizeMode: 'contain'
})`
  height: ${RFValue(200)}px;
  width: ${RFValue(250)}px;
  align-self: center;
  margin-top: ${RFValue(30)}px;;
  margin-bottom: ${RFValue(30)}px;;
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center; 
  margin-top: 50px; 
`;

export const FooterWrapper = styled.View`
    margin-top: ${RFPercentage(+4)}px;
    padding: 0 ${RFValue(32)}px;
    justify-content: space-between;
    align-items: center;
`;