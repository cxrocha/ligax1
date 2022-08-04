import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
`;

export const ContainerSelect = styled.TouchableOpacity`
    width: 88%;
    padding: 0px 2px;
`;

export const OptionContainer = styled.View`
    width: 12%;
    flex-direction: row;
`;

export const Name = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.FONTS.BOLD};
    color: ${({ theme }) => theme.COLORS.TEXT_DARK};
`;

export const NickName = styled.Text`
    font-size: ${RFValue(12)}px;
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    color: ${({ theme }) => theme.COLORS.TEXT_DARK};
`;
  
export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(20)}px;
`;