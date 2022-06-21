import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import theme from '@src/theme';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;

export const Title = styled.Text`
    font-size: ${RFValue(24)}px;
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    color: ${({ theme }) => theme.COLORS.TEXT_DARK};
    text-align: center;
    margin-bottom: 12px;
`;

export const Form = styled.View`
    flex: 1;
    justify-content: space-between;
    width: 100%;
    padding: ${RFValue(24)}px;
`;

export const ResultContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SetContainer = styled.View`
  border-width: 1px;
  border-radius: 12px;
  padding: 8px 8px;
  padding-bottom: 0px;
  background-color: ${({theme})=>theme.COLORS.WHITE};
`;


export const VsContainer = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    color: ${({ theme }) => theme.COLORS.TEXT_DARK};
    text-align: center;
`;

export const TitleSetContainer = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    color: ${({ theme }) => theme.COLORS.TEXT_DARK};
    text-align: center;
`;


export const BackBar = styled.View`    
  align-items: flex-start;
  margin-top: ${getStatusBarHeight()}px;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND_DARK};
  height: ${RFValue(40)}px;
`;