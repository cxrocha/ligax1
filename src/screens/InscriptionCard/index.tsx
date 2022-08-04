import React, { useCallback, useState } from "react"
import {Modal, Alert, View, ImageBackground} from "react-native"
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../hooks/auth';

import { Header } from "../../components/Header"
import { EtapaSelectButton } from "../../components/Forms/EtapaSelectButton"
import { EtapaSelect } from "../EtapaSelect"
import { AthleteSelectButton } from "../../components/Forms/AthleteSelectButton"
import { Container, Title } from "./styles"
import { AthleteSelect } from "../AthleteSelect"
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ButtonConfirm } from "../../components/ButtonConfirm";

import backgroundImage from '../../assets/images/background.png';

type AthleteProps = {id: string, name: string, nickName: string, eMail: string, bornDate: string, gendler: string};
type EtapaProps = {sDate: string, title: string, isOpen:boolean};

export function InscriptionCard() {
  const[etapaModalOpen, setEtapaModalOpen] = useState(false);
  const [etapa, setEtapa] = useState<EtapaProps>({ sDate: '', title: '', isOpen:true});
  const [athlete, setAthlete] = useState<AthleteProps>({ id: '', name: '', nickName: '', eMail: '', bornDate: '', gendler: 'M' });
  const[athleteModalOpen, setAthleteModalOpen] = useState(false);

  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
//  console.log(user);


  function handleOpenSelectEtapaModal() {
    setEtapaModalOpen(true);
  }  
  
  function handleCloseSelectEtapaModal() {
    setEtapaModalOpen(false);
  }

  function handleCloseSelectAthleteModal(){
    setAthleteModalOpen(false);
}

function handleOpenSelectAthleteModal(){
    setAthleteModalOpen(true);
}

function handleInsertRegister(etapa: EtapaProps, athlete: AthleteProps) {
  if (etapa.title==="") { return Alert.alert("Para se inscrever, uma ETAPA deve ser selecionada !"); } ;
  if (athlete.name==="") { return Alert.alert("Para se inscrever, um ATLETA deve ser selecionado !"); } ;
  firestore()
  .collection('registerEtapa')
  .add({
    etapa,
    athlete,
  })
  .then(() => { setAthlete({ id: '', name: '', nickName: '', eMail: '', bornDate: '', gendler: '' }),
                setEtapa({ sDate: '', title: '', isOpen:true}) })  
  .catch(() => {
    Alert.alert('Ranking', 'Não foi possível registrar a inscrição.');
  });

  };


return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Container>
    <ImageBackground source={backgroundImage} resizeMode='stretch' style={{flex:1}}>          
          <Header title="Inscrição Para Etapa"/>
          <EtapaSelectButton 
            title={etapa.title}
            onPress={handleOpenSelectEtapaModal}
          />        
          <AthleteSelectButton 
            athlete = {athlete}
            onPress={handleOpenSelectAthleteModal}
          />
          <View style={{height:20}}></View>
          <ButtonConfirm
            title='Inscrever'
            onPress = { () => handleInsertRegister(etapa, athlete) }/> 

          <Modal 
            visible={etapaModalOpen} 
            transparent={true}
            animationType="slide">
              <EtapaSelect 
                  etapa = {etapa}
                  setEtapa = {setEtapa}
                  closeSelectEtapa = {handleCloseSelectEtapaModal}
              />
          </Modal>

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
  </GestureHandlerRootView>
)
}