import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;

export const Title = styled.Text`
    font-size: ${RFValue(24)}px;
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    color: ${({ theme }) => theme.COLORS.TEXT_DARK};
    text-align: center;
`;

export const Form = styled.View`
    flex: 1;
    justify-content: space-between;
    width: 100%;
    padding: ${RFValue(24)}px;
`;

export const Fields = styled.View`
`;

export const GenderOptions = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 16px;
`;

export const BackBar = styled.View`    
  align-items: flex-start;
  margin-top: ${getStatusBarHeight()}px;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND_DARK};
  height: ${RFValue(40)}px;
`;