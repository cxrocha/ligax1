import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    width: 20%;
    border-radius: 5px;
    align-content: space-around;
    justify-content: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.FONTS.BOLD};
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.COLORS.TEXT_DARK};
    align-self: center;
`;

export const SubTitle = styled.Text`
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    font-size: ${RFValue(10)}px;
    color: ${({ theme }) => theme.COLORS.TEXT_LIGHT};
    align-self: center;
`;
