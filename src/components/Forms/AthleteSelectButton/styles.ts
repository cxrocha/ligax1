import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    flex-direction: row;
    background-color: ${({theme})=>theme.COLORS.SHAPE};
    flex-direction: row;
    align-items: center;
    border-radius: 12px;
    margin: 12px 16px;
    height: 32px;
`;

export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(20)}px;
`;

export const Athlete = styled.Text`
    font-family: ${({theme})=>theme.FONTS.REGULAR};
    font-size: ${RFValue(14)}px;
    margin-left: 16px;
`;



