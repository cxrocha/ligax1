import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AthleteProps } from "../../../@types/interface";

import { 
    Container,
    Athlete,
    Icon
} from './styles';

type Props = {athlete: AthleteProps} & { onPress: () => void; }

export function AthleteSelectButton({athlete, onPress}: Props){
    return (
        <Container onPress={onPress}>
            <Icon name='search' />
            <Athlete>{athlete.name=="" ? 'Nome' : athlete.name}</Athlete>
        </Container>

    )
}