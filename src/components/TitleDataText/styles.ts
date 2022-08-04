import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  padding: 0px 5px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.TEXT};
  `};
`;

