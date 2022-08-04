import React, { useState, useEffect, useCallback } from 'react';
import { Modal, TouchableOpacity, Alert, FlatList, ImageBackground } from 'react-native';
import { useTheme } from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { RankingInsertNavigationProps } from '../../@types/navigation';
import { AthleteSelectButton } from '../../components/Forms/AthleteSelectButton';
import { AthleteSelect } from '../../screens/AthleteSelect';

import backgroundImage from '../../assets/images/background.png';

import {
  Container,
  Title,
  ButtonContainer,
  BackBar,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { InputRankingNumber } from '../../components/InputRankingNumber';
import { Header } from '../../components/Header';
import { ButtonConfirm } from '../../components/ButtonConfirm';
import { BackButton } from '../../controllers/BackButton';

export function RankingInsert() {
  const route = useRoute();
  const {COLORS} = useTheme();
  const { sDate } = route.params as RankingInsertNavigationProps;




  const [ rankingNumber, setRankingNumber ] = useState("");
  const [athlete, setAthlete] = useState({ id: 'id', name: 'Nome do Athleta', nickName: 'Apelido', eMail: 'E-mail', bornDate:'Data Nasc', gendler: 'M' });
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
        athlete: {athleteId :athlete.id, name: athlete.name, nickName: athlete.nickName, eMail: athlete.eMail, bornDate: athlete.bornDate, gendler: athlete.gendler},        
        date: sDate,
        position: rankingNumber
      })
      .then(() => navigation.goBack())  
      .catch(() => {
        Alert.alert('Ranking', 'Não foi possível registrar o ranking.');
        setSendingRanking(false);
      });}

  function handleGoBack() {
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
      <ImageBackground source={backgroundImage} resizeMode='stretch' style={{flex:1}}>          
        <BackBar>
          <BackButton title="Voltar" icon="arrow-back" onPress={() => handleGoBack()} />
        </BackBar>        
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
          <ButtonConfirm
            title="Registrar Ranking"
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
      </ImageBackground>
    </Container>
  )
}