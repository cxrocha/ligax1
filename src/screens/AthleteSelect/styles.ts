import styled, { css } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const HeaderBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 12px;
`;

export const MenuHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 25px 5px;
  padding-bottom: 3px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const MenuItemsNumber = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;

export const Title = styled.Text`
  font-size: 20px;
  line-height: 20px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;

