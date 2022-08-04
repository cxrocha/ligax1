
import React from "react";
import { View } from "react-native";
import { RankingCard } from "../RankingCard";
import { AthleteCard } from "../AthleteCard";
import { AthleteProps } from "../../@types/interface";

import { 
    Container,
 } from './styles';
import { useNavigation } from "@react-navigation/native";

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
  const { athleteId,  name, nickName, gendler } = data;
  const dataAthleteCard  = {id:athleteId, name, nickName, gendler, bornDate:'', eMail:''}

  const navigation = useNavigation();

  function handleAthleteSelect(data: AthleteProps){
    console.log(data);
    navigation.navigate('athleteDetails', data);
  }

    return (
        <Container>
            <RankingCard  position={data.position}/>
            <AthleteCard 
              data = {dataAthleteCard}
              options = {false}
              onPressSel  ={() => handleAthleteSelect(dataAthleteCard)}
            />
        </Container>
    )
}  


