import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

type  ContainerProps = {
    isActive: boolean,
}

interface TitleProps {
    isActive: boolean;
}
  
export const Container = styled.TouchableOpacity<ContainerProps>`
    background-color: ${({theme, isActive}) => isActive ? theme.COLORS.BACKGROUND_DARK : theme.COLORS.BACKGROUND_LIGHT};
    width: ${RFValue(150)}px;
    height: ${RFValue(30)}px;
    border-radius: 8px;
    border-width: 2px;
    border-color: ${({ theme, isActive }) => isActive ? theme.COLORS.TEXT_DARK : theme.COLORS.TEXT_DARK};
    margin: 5px;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text<TitleProps>`
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    font-size: ${RFValue(16)}px;
    color: ${({ theme, isActive }) => isActive ? theme.COLORS.TEXT_LIGHT : theme.COLORS.TEXT_DARK};
`;
