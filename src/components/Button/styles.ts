import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export type TypeProps = 'confirm' | 'cancel';

type ContainerProps = {
  type: TypeProps;
}

export const Container = styled(RectButton) <ContainerProps>`
  flex: 1;
  max-height: 56px;
  min-height: 56px;
  width: ${RFValue(150)}px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  
  background-color: ${({ theme, type }) => type === 'confirm' ? theme.COLORS.SUCCESS_900 : theme.COLORS.PRIMARY_800};
`;

export const Title = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.TEXT};
  `};
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.TITLE
}))``;