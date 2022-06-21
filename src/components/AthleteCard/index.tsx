
import React, { useState, useEffect } from "react";
import { RectButtonProps } from 'react-native-gesture-handler';

import { AthleteProps } from "../../@types/interface";


import { 
    Container,
    Name,
    NickName,
    Icon,
    OptionContainer,
    ContainerSelect
 } from './styles';

    
type Props = { data: AthleteProps; } & 
             { options?: boolean, 
               onPressSel: ()=> void,  
               onPressView?: ()=> void,  
               onPressDel?: ()=> void,  
               onPressEdit?: ()=> void,  
            } & RectButtonProps

export function AthleteCard({data, options, onPressSel, onPressView, onPressDel, onPressEdit, ...rest} : Props) {
    return (
        <Container>
            <ContainerSelect onPress={onPressSel} {...rest}>
                <Name>{data.name} / {data.nickName}</Name>
            </ContainerSelect>
            {options && <OptionContainer>
                <ContainerSelect onPress={onPressView}>
                    <Icon name='eye' />
                </ContainerSelect>
                <ContainerSelect onPress={onPressDel}>
                    <Icon name='trash-2' />
                </ContainerSelect>
                <ContainerSelect onPress={onPressEdit}>
                    <Icon name='edit' />
                </ContainerSelect>
            </OptionContainer> }
        </Container>
    )
}

