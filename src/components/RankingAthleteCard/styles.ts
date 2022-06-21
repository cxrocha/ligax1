import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    width: 95%;
    height: ${RFValue(30)}px;
    flex-direction: row;
    align-self: center;
    border-radius: 10px;
    margin-top:5px;
    justify-content: space-around;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_LIGHT};
`;


