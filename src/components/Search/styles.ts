import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { TextInput } from 'react-native';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: "#000";
`;

export const InputArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  ${({ theme }) => css`
    background-color: ${theme.COLORS.TITLE};
    border: 1px solid ${theme.COLORS.SHAPE};
  `};
`;

export const Input = styled(TextInput)`
  flex: 1;
  height: 32px;
  padding-left: 12px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
`;

export const ButtonClear = styled.TouchableOpacity`
  margin-right: 7px;
`;

