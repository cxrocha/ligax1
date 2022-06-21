import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { 
    Container,
    Gender,
    Icon,
} from './styles';

interface Props {
    title: string;
    onPress: () => void;
}

export function GenderSelectButton({title, onPress}: Props){
    return (
        <GestureHandlerRootView>
            <Container onPress={onPress}>
                <Gender>{title}</Gender>
                <Icon name='chevron-down' />
            </Container>
        </GestureHandlerRootView>
    )
}