import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
    width: 50%;
    background-color: ${({theme})=>theme.COLORS.BACKGROUND_LIGHT};
    padding: 4px;
    border-radius: 16px;
    align-items: center;
    align-self: center;
    margin-bottom: 4px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONTS.MEDIUM};
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.COLORS.BACKGROUND_DARK};
`;