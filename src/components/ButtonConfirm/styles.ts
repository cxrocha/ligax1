import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  height: ${RFValue(30)}px;
  width: ${RFValue(150)}px;
  border-radius: 12px;
  justify-content: center;
  align-self: center;
  align-items: center;
  background-color: ${({theme})=>theme.COLORS.PRIMARY_900};
`;

export const Title = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT_LIGHT};
    font-family: ${theme.FONTS.TEXT};
  `};
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.TEXT_LIGHT
}))``;


