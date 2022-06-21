import styled from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  height: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  border-radius: 5px;
  align-items: center;
  margin-bottom: ${RFValue(8)}px;
  flex-direction: row;
`;

export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border-right-width: 1px;
`;

export const Title = styled.Text`
flex: 1;
  text-align: center;
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
  font-size: ${RFValue(14)}px;
`;