import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { UserTabRoutes } from './user.tab.routes';
import { RankingList } from '../screens/RankingList';
import { AthleteInsert } from '../screens/AthleteInsert';
import { RankingInsert } from '../screens/RankingInsert';
import { SignIn } from "../screens/SignIn";
import { UserInsert } from "../screens/UserInsert";
import { GamesList } from "../screens/GamesList";
import { GameInsert } from "../screens/GameInsert";
import { InscriptionCard } from "../screens/InscriptionCard";


const { Navigator, Screen, Group } = createNativeStackNavigator();

export function UserStackRoutes() {


  return (
    <Navigator 
      screenOptions={{ 
        headerShown: false,
        }}>
      <Group>
        <Screen name="UserTabRoutes" component={UserTabRoutes} />
        <Screen name="rankingList" component={RankingList} />
        <Screen name="rankingInsert" component={RankingInsert} />
        <Screen name="userInsert" component={UserInsert} />
        <Screen name="signIn" component={SignIn} />
        <Screen name="athleteInsert" component={AthleteInsert} />
        <Screen name="gameInsert" component={GameInsert} />
        <Screen name="gamesList" component={GamesList} />
        <Screen name="inscriptionCard" component={InscriptionCard} />
      </Group>
    </Navigator>
  );
}