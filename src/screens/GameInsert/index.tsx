import React, {useState, useEffect} from 'react';
import { 
    Keyboard,
    Alert,
    Modal} from 'react-native'

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';

import { TouchableWithoutFeedback, GestureHandlerRootView } from 'react-native-gesture-handler';
import firestore from "@react-native-firebase/firestore";

import { 
  Container,
  BackBar,
  Title,
  Form,
  ResultContainer,
  SetContainer,
  TitleSetContainer,
  VsContainer,
} from './styles';

import { BackButton } from '../../controllers/BackButton';
import { DefaultBackground } from '../../components/DefaultBackground';
import { Header } from '../../components/Header';
import { AthleteSelectButton } from '../../components/Forms/AthleteSelectButton';
import { AthleteSelect } from '../AthleteSelect';
import { AthleteProps } from '../../@types/interface';
import { GameInsertNavigationProps } from '../../@types/navigation';
import { Input } from '../../components/Input';


export function GameInsert() {
    const navigation = useNavigation();
    const route = useRoute();
    console.log(route.params);
    const {type, id, etapa, athlete1, athlete2, set1, set2, set3}  = route.params as GameInsertNavigationProps;

    const[athlete1ModalOpen, setAthlete1ModalOpen] = useState(false);
    const[athlete2ModalOpen, setAthlete2ModalOpen] = useState(false);
    const[formAthlete1, setFormAthlete1] = useState<AthleteProps>(athlete1);
    const[formAthlete2, setFormAthlete2] = useState<AthleteProps>(athlete2);
    const[formSet1Player1, setFormSet1Player1] = useState(set1.player1);
    const[formSet1Player2, setFormSet1Player2] = useState(set1.player2);
    const[formSet2Player1, setFormSet2Player1] = useState(set2.player1);
    const[formSet2Player2, setFormSet2Player2] = useState(set2.player2);
    const[formSet3Player1, setFormSet3Player1] = useState(set3.player1);
    const[formSet3Player2, setFormSet3Player2] = useState(set3.player2);

    function handleGoBack() {
        navigation.goBack();
    }

    function handleGameDel() {
    firestore().collection('games').doc(id).delete()
    .then(()=> { Alert.alert('Jogo apagado com sucesso!');
    })
    .catch((error) => console.log(error))
    .finally(()=>navigation.goBack())
    }

    function handleGameEdit(form: FormData) {
        firestore().collection('games').doc(id).update({
          etapa: etapa,
          athlete1: athlete1,
          athlete2: athlete2,
          set1: { player1: formSet1Player1, player2: formSet1Player2 },
          set2: { player1: formSet2Player1, player2: formSet2Player2 },
          set3: { player1: formSet3Player1, player2: formSet3Player2 },
        })
        .then(()=> { Alert.alert('Jogo alterado com sucesso!');
        })
        .catch((error) => console.log(error))
        .finally(()=>navigation.goBack())
    }

    function handleGameAdd(form: FormData) {
        if(!formAthlete1) return Alert.alert('Selecione o primeiro atleta');
        if(!formAthlete2) return Alert.alert('Selecione o primeiro atleta');
        firestore().collection('games')
        .add({
            etapa: etapa,
            athlete1: formAthlete1,
            athlete2: formAthlete2,
            set1: { player1: formSet1Player1, player2: formSet1Player2 },
            set2: { player1: formSet2Player1, player2: formSet2Player2 },
            set3: { player1: formSet3Player1, player2: formSet3Player2 },
            createAt: firestore.FieldValue.serverTimestamp()
        })
        .then(()=> {
            setFormAthlete1({} as AthleteProps);
            setFormAthlete2({} as AthleteProps);
            Alert.alert('Jogo adicionado com sucesso!');
        })
        .catch((error) => console.log(error))    
        .finally(()=>navigation.goBack())
    }
    
    function handleOpenSelectAthlete1Modal() { setAthlete1ModalOpen(true); }
    function handleOpenSelectAthlete2Modal() { setAthlete2ModalOpen(true); }

    function handleCloseSelectAthlete1Modal() { setAthlete1ModalOpen(false); }
    function handleCloseSelectAthlete2Modal() { setAthlete2ModalOpen(false); }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <Container>
          <DefaultBackground>
            <BackBar>
                <BackButton title="Voltar" icon="arrow-back" onPress={() => handleGoBack()} />
            </BackBar>
            <Header title="Cadastro de Jogo"/>
            <AthleteSelectButton
              athlete={formAthlete1}
              onPress={handleOpenSelectAthlete1Modal}
            />
            <VsContainer>Vs</VsContainer>
            <AthleteSelectButton
              athlete={formAthlete2}
              onPress={handleOpenSelectAthlete2Modal}
            />
            <Form>
                <ResultContainer>
                  <SetContainer>
                    <TitleSetContainer>1º Set</TitleSetContainer>
                    <Input
                        editable = {type=='Add' || type=='Edit'}
                        keyboardType = 'numeric'
                        defaultValue = {formSet1Player1}
                        onChangeText = {setFormSet1Player1}
                    />
                    <VsContainer>x</VsContainer>
                    <Input
                        editable = {type=='Add' || type=='Edit'}
                        keyboardType = 'numeric'
                        defaultValue = {formSet1Player2}
                        onChangeText = {setFormSet1Player2}
                    />
                  </SetContainer>
                  <SetContainer>
                    <TitleSetContainer>2º Set</TitleSetContainer>
                    <Input
                        editable = {type=='Add' || type=='Edit'}
                        keyboardType = 'numeric'
                        defaultValue = {formSet2Player1}
                        onChangeText = {setFormSet2Player1}
                    />
                    <VsContainer>x</VsContainer>
                    <Input
                        editable = {type=='Add' || type=='Edit'}
                        keyboardType = 'numeric'
                        defaultValue = {formSet2Player2}
                        onChangeText = {setFormSet2Player2}
                    />
                    </SetContainer>
                    <SetContainer>
                    <TitleSetContainer>3º Set</TitleSetContainer>
                    <Input
                        editable = {type=='Add' || type=='Edit'}
                        defaultValue = {formSet3Player1}
                        onChangeText = {setFormSet3Player1}
                    />
                    <VsContainer>x</VsContainer>
                    <Input
                        editable = {type=='Add' || type=='Edit'}
                        defaultValue = {formSet3Player2}
                        onChangeText = {()=>setFormSet3Player2(formSet3Player2)}
                    />
                    </SetContainer>  
                </ResultContainer>
                <Button 
                    title = { type=='Add' ? 'Gravar' 
                            : type=='Edit' ? 'Aterar' 
                            : type=='View' ? 'Fechar' 
                            : 'Apagar'}
                    onPress = { type=='Add' ? handleGameAdd
                              : type=='Edit' ? handleGameEdit
                              : type=='View' ? handleGoBack
                              : handleGameDel }
                />
            </Form>

          <Modal 
            visible={athlete1ModalOpen} 
            transparent={true}
            animationType="slide">
              <AthleteSelect 
                  athlete = {formAthlete1}
                  setAthlete = {setFormAthlete1}
                  closeSelectAthlete = {handleCloseSelectAthlete1Modal}
              />
          </Modal>


          <Modal 
            visible={athlete2ModalOpen} 
            transparent={true}
            animationType="slide">
              <AthleteSelect 
                  athlete = {formAthlete2}
                  setAthlete = {setFormAthlete2}
                  closeSelectAthlete = {handleCloseSelectAthlete2Modal}
              />
          </Modal>

            </DefaultBackground>
        </Container>
        </GestureHandlerRootView>
    )
}

