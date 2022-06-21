import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';


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