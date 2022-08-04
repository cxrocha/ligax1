import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {getStatusBarHeight} from 'react-native-iphone-x-helper';


export const Container = styled.View`
flex: 1;
`;

export const ContainerAthleteData = styled.View`
height: ${RFValue(105)}px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BLACK};
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  margin: 8px 8px;
`

export const BackBar = styled.View`    
  align-items: flex-start;
  margin-top: ${getStatusBarHeight()}px;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND_DARK};
  height: ${RFValue(40)}px;
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.TITLE
}))``;
