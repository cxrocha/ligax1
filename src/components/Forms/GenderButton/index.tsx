import React from 'react';
import {TouchableOpacityProps} from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import {Container, Icon, Title} from './styles'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

interface Props extends TouchableOpacityProps {
    enabled: boolean;
    type: "M" | "F";
    title: string;
    isActive: boolean;
}

export function GenderButton({
    enabled,
    type, 
    title,
    isActive,
    ...rest}: Props) {
    return(                        
            <Container  
                enabled = {enabled}
                isActive={isActive}
                type={type}
                {...rest} 
            >
                <Icon 
                    name={icons[type]} 
                    type={type}
                />
                <Title>
                    {title}
                </Title>
            </Container>
    );
}