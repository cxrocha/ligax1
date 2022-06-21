import React from "react";
import {RectButtonProps, GestureHandlerRootView} from 'react-native-gesture-handler';

import { 
    Container,
    Title,
 } from './styles';

interface Props extends RectButtonProps {
    title: string,
    isActive: boolean,
    onPress: () => void;
};
    
export function EtapaCard({
    isActive,
    title, 
    onPress,
    ...rest
} : Props) {
        return (
            <GestureHandlerRootView>
                <Container isActive={isActive} onPress={onPress} {...rest}>
                    <Title isActive={isActive}>{title}</Title>
                </Container>
            </GestureHandlerRootView>
    )
}



