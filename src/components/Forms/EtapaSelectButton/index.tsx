import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { 
    Container,
    Etapa,
    Icon
} from './styles';

interface Props {
    title: string;
    onPress: () => void;
}

export function EtapaSelectButton({title, onPress}: Props){
    return (
        <Container onPress={onPress}>
            <Icon name='search' />
            <Etapa>{title=='' ? 'Etapa' : title}</Etapa>
        </Container>

    )
}