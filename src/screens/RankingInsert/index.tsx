import React, { useState, useEffect, useCallback } from 'react';
import { Modal, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { RankingInsertNavigationProps } from '../../@types/navigation';
import { AthleteSelectButton } from '../../components/Forms/AthleteSelectButton';
import { AthleteSelect } from '../../screens/AthleteSelect';

import {
  Container,
  Title,
  ButtonContainer,
} from './styles';
import { DefaultBackground } from '../../components/DefaultBackground';
import { useAuth } from '../../hooks/auth';
import { InputRankingNumber } from '../../components/InputRankingNumber';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';

export function RankingInsert() {
  const route = useRoute();
  const {COLORS} = useTheme();
  const { sDate } = route.params as RankingInsertNavigationProps;

  const [ rankingNumber, setRankingNumber ] = useState("");
  const [athlete, setAthlete] = useState({ key: 'id', name: 'Nome do Athleta', nickName: 'Apelido', gendler: 'M' });
  const [sendingRanking, setSendingRanking] = useState(false);
  const[athleteModalOpen, setAthleteModalOpen] = useState(false);

  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  function handleAdd() {
    if (!athlete) {
      return Alert.alert('Ranking', 'Selecione o athleta.');
    }
    if (!rankingNumber) {
      return Alert.alert('Ranking', 'Digite a posição do Ranking.');
    }

    setSendingRanking(true);

    firestore()
      .collection('rankings')
      .add({
        athlete: {athleteId :athlete.key, name: athlete.name, nickName: athlete.nickName, gendler: athlete.gendler},
        date: sDate,
        position: rankingNumber
      })
      .then(() => navigation.goBack())  
      .catch(() => {
        Alert.alert('Ranking', 'Não foi possível registrar o ranking.');
        setSendingRanking(false);
      });}

  function handleCancel() {
    navigation.goBack();
  }

  function handleCloseSelectAthleteModal(){
    setAthleteModalOpen(false);
}

function handleOpenSelectAthleteModal(){
    setAthleteModalOpen(true);
}

  return (
    <Container>
      <DefaultBackground>
        <Header title="Ranking Register"/>
        <AthleteSelectButton 
          athlete={athlete}
          onPress={handleOpenSelectAthleteModal}
        />
        <InputRankingNumber
          placeholder="Ranking" 
          onChangeText={setRankingNumber}
          value={rankingNumber}
        />

        <ButtonContainer>
          <Button
            title="Cancelar"
            type="cancel"
            onPress={handleCancel}
          />
          <Button
            title="Registrar Ranking"
            type="confirm"
            onPress={handleAdd}
          />
        </ButtonContainer>

        <Modal 
          visible={athleteModalOpen} 
          transparent={true}
          animationType="slide">
            <AthleteSelect 
                athlete = {athlete}
                setAthlete = {setAthlete}
                closeSelectAthlete = {handleCloseSelectAthleteModal}
            />
        </Modal>
      </DefaultBackground>
    </Container>
  )
}