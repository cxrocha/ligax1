import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    flex-direction: row;
    background-color: ${({theme})=>theme.COLORS.SHAPE};
    align-self: center;
    align-items: center;
    width: 50%;
    padding: 4px;
    border-radius: 12px;
    margin: 18px 16px;
`;

export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(20)}px;
`;

export const Etapa = styled.Text`
    margin-left: 16px;
    font-family: ${({theme})=>theme.FONTS.REGULAR};
    font-size: ${RFValue(14)}px;
`;


