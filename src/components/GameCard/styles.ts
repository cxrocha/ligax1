import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';


export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 4px;
  border-radius: 8px;
  border-width: 1px;
`;

export const MatchContainer = styled(RectButton)`
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    padding: 0px 8px;
`;

export const PlayersContainer = styled.View`
  flex-direction: column;
`;

export const PlayerName = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    color: ${({ theme }) => theme.COLORS.TEXT_DARK};
`;

export const ContainerSets = styled.View`
  flex-direction: row;
`;

export const ContainerSet = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 2px;
`;

export const TextSet = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    color: ${({ theme }) => theme.COLORS.TEXT};
`;

export const OptionContainer = styled.View`
    flex-direction: column;
`;

export const ContainerSelect = styled(RectButton)`
    padding: 4px 4px;
`;

export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(20)}px;
`;