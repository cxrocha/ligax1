import styled, { css } from 'styled-components/native';
import { Feather} from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
`;

export const EtapaCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 10}
})`
    width: 100%;
`;

export const HorizontalContainerFlatList = styled.View`
  height: 40px;
`

