import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    background-color: ${({theme})=>theme.COLORS.SHAPE};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: 18px 16px;
`;

export const Gender = styled.Text`
    font-family: ${({theme})=>theme.FONTS.REGULAR};
    font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme})=>theme.COLORS.TEXT};
`;