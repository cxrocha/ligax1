
import React from "react";
import { View } from "react-native";
import { RankingCard } from "../RankingCard";
import { AthleteCard } from "../AthleteCard";

import { 
    Container,
 } from './styles';

export interface RankingAthleteProps  {
    id: string,
    athleteId: string;
    date: string,
    name: string,
    nickName: string,
    gendler: string,
    position: number,
}

type Props = {data: RankingAthleteProps};

export function RankingAthleteCard({data, ...rest} : Props) {
    return (
        <Container>
            <RankingCard  position={data.position}/>
            <AthleteCard data = {data}/>
        </Container>
    )
}  

