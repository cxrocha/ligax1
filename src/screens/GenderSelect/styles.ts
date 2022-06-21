import { RFValue } from "react-native-responsive-fontsize";
import {Feather} from '@expo/vector-icons';
import styled from "styled-components/native";

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import theme from '../../global/styles/theme';

interface GenderProps{
    isActive: boolean,
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({ theme }) => theme.COLORS.PRIMARY };
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px; 
`;
export const Title = styled.Text`
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    font-size: ${RFValue(18)}px;;
    background-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const Gender  = styled.TouchableOpacity<GenderProps>`
    width: 100%;
    padding: ${RFValue(15)}px;;
    flex-direction: row;
    align-items: center;

    background-color: ${({isActive}) => 
        isActive ? theme.COLORS.BACKGROUND_HIGHT : theme.COLORS.BACKGROUND_LIGHT};
`;

export const Icon  = styled(Feather)`
    font-size: ${RFValue(20)}px;;
    margin-right: 16px;
`;

export const Name  = styled.Text`
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    font-size: ${RFValue(14)}px;;
`;

export const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.TEXT};

`;

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;




