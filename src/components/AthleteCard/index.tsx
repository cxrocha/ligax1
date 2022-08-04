
import React from "react";
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
            } 

export function AthleteCard({data, options, onPressSel, onPressView, onPressDel, onPressEdit} : Props) {
    return (
        <Container>
            <ContainerSelect onPress={onPressSel}>
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

