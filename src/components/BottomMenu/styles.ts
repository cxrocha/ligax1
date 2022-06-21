import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

type TitleProps = {
  color: string;
};

type NotificationProps = {
  noNotifications: boolean;
};

export const Container = styled.View`
  width: 80px;
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
`;

export const Title = styled.Text<TitleProps>`
  font-size: 18px;

  ${({ theme, color }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${color};    
  `};
`;

export const Notification = styled.View<NotificationProps>`
  height: 20px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  margin-left: 8px;

  ${({ noNotifications, theme }) => !noNotifications && css`
    background-color: ${theme.COLORS.SUCCESS_900};
  `};

  ${({ noNotifications, theme }) => noNotifications && css`
    background-color: transparent;
    border: 1px solid ${theme.COLORS.SHAPE};
  `};
`;

export const Quantity = styled.Text<NotificationProps>`
  font-size: 12px;

  ${({ noNotifications, theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${noNotifications ? theme.COLORS.SECONDARY_500 : theme.COLORS.TITLE};
  `};
`;