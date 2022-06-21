import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RankingList } from '../screens/RankingList';
import { BottomMenu } from '../components/BottomMenu';
import { InscriptionCard } from '../screens/InscriptionCard';
import { GamesList } from '../screens/GamesList';
import { useAuth } from '../hooks/auth';
import { SignIn } from '../screens/SignIn';

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {
  const { COLORS } = useTheme();
  const { user } = useAuth();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.WHITE,
        tabBarInactiveTintColor: COLORS.TEXT,
        tabBarLabelPosition: 'beside-icon',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.BACKGROUND_LOW,
          height: 60,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0
        }
      }}
    >
      <Screen
        name="rankingList"
        component={RankingList}
        options={{
          tabBarIcon: ({ size, color }) => (
            <BottomMenu size={size} icon= "list" title="Ranking" color={color} />
          )
        }}
      />

      <Screen
        name="inscriptionCard"
        component={user ? InscriptionCard : SignIn}
        options={{ 
          tabBarIcon: ({ size, color }) => (
            <BottomMenu size={size} icon= "edit" title="Inscrição" color={color} />
          )
        }}
      />

    <Screen
        name="gamesList"
        component={GamesList}
        options={{
          tabBarIcon: ({ size, color }) => (
            <BottomMenu size={size} icon= "align-justify" title="Jogos" color={color} />
          )
        }}
      />
    </Navigator>
  );
}