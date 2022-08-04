import React, { useState, useEffect } from "react";
import { RectButtonProps } from 'react-native-gesture-handler';

import { GameProps } from "../../@types/interface";

import { 
    Container,
    MatchContainer,
    PlayersContainer,
    PlayerName,
    Icon,
    OptionContainer,
    ContainerSets,
    ContainerSet,
    TextSet,
    ContainerSelect,
 } from './styles';

 
      
type Props = { data: GameProps; } & 
             { options?: boolean, 
               onPressSel: ()=> void,  
               onPressDel?: ()=> void,  
               onPressEdit?: ()=> void,  
            } & RectButtonProps

export function GameCard({data, options, onPressSel, onPressDel, onPressEdit, ...rest} : Props) {
    return (
        <Container>
            <MatchContainer onPress={onPressSel} {...rest}>
              <PlayersContainer>
                <PlayerName>{data.athlete1.nickName}</PlayerName>
                <PlayerName>{data.athlete2.nickName}</PlayerName>
              </PlayersContainer>
              <ContainerSets>
              {!((data.set1.player1=='') && (data.set1.player2=='')) &&
                  <ContainerSet>
                    <TextSet>{data.set1.player1}</TextSet> 
                    <TextSet>{data.set1.player2}</TextSet> 
                  </ContainerSet> }
                {!((data.set2.player1=='') && (data.set2.player2=='')) &&
                  <ContainerSet>
                    <TextSet>{data.set2.player1}</TextSet> 
                    <TextSet>{data.set2.player2}</TextSet> 
                  </ContainerSet> }
                {!((data.set3.player1=='') && (data.set3.player2=='')) &&
                  <ContainerSet>
                    <TextSet>{data.set3.player1}</TextSet> 
                    <TextSet>{data.set3.player2}</TextSet> 
                  </ContainerSet> }
              </ContainerSets>
            </MatchContainer>
            {options && 
              <OptionContainer>
                <ContainerSelect onPress={onPressEdit}>
                    <Icon name='edit' />
                </ContainerSelect>
                <ContainerSelect onPress={onPressDel}>
                    <Icon name='trash-2' />
                </ContainerSelect>
              </OptionContainer> }
        </Container>
    )
}

