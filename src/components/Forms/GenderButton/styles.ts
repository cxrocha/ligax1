import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
    type: 'M' | 'F'
}

interface ContainerProps {
    isActive: boolean;
    type: 'M' | 'F'
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${({theme})=>theme.COLORS.BACKGROUND};

    border-width: ${({isActive}) => isActive ? 0 : 1.5}px;
    border-radius: 12px;
    border-style: solid;
    border-color: ${({theme})=>theme.COLORS.WHITE};

    padding: 0px;

    ${({isActive, type})=> isActive && type==='M' && css`
        background-color:${({theme})=>theme.COLORS.BACKGROUND_DARK}`}

    ${({isActive, type})=> isActive && type==='F' && css`
    background-color:${({theme})=>theme.COLORS.BACKGROUND_DARK}`}

`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${({theme, type}) => type==="up" ? theme.COLORS.SUCCESS : theme.COLORS.ATTENTION}
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONTS.REGULAR};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.COLORS.BLACK};
`;