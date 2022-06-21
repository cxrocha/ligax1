import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    width: 100%;
`;

export const Error = styled.Text`
    font-size: ${RFValue(14)};
    font-family: ${({theme}) => theme.FONTS.REGULAR};
    color: ${({theme}) => theme.COLORS.ATTENTION};

    margin: 7px 0px;
`;

