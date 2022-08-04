import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { Header } from '../../components/Header';
import { GameCard } from '../../components/GameCard';
import { GameProps, AthleteProps } from '../../../src/@types/interface';

import { Container, Title } from './styles';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation } from '@react-navigation/native';
import { GameInsertNavigationProps } from '../../@types/navigation';
import { AthleteSelectButton } from '../../components/Forms/AthleteSelectButton';
import { AthleteSelect } from '../AthleteSelect';

import backgroundImage from '../../assets/images/background.png';

type GameOptionProps = {type: string} & GameProps;

export function AthleteGamesList() {
  const [athlete, setAthlete] = useState<AthleteProps>({ id: 'id', name: 'Nome do Athleta', nickName: 'Apelido', eMail: '', bornDate:'', gendler: 'M' });
  const[athleteModalOpen, setAthleteModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [matchList, setMatchList] = useState<GameProps[]>([]);

  const navigation = useNavigation();

  function handleOpenSelectAthleteModal()  { setAthleteModalOpen(true); }
  function handleCloseSelectAthleteModal() { setAthleteModalOpen(false); }
  function handleCallGame(gameDataNavigation: GameInsertNavigationProps) {
    navigation.navigate('gameInsert', gameDataNavigation)
  };

  function fetchMatchList() {    
    setIsLoading(true);
    setMatchList([]);
    const subscribe = firestore()
      .collection('games')
      .where('athlete1.id','==',athlete.id)
      .orderBy('etapa.sDate')
      .onSnapshot((querySnapshot => { 
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            athlete1: doc.data().athlete1,
            athlete2: doc.data().athlete2,
            etapa: doc.data().etapa,
            set1: doc.data().set1,
            set2: doc.data().set2,
            set3: doc.data().set3,
          }
      }) as GameProps[];
      setMatchList(data);
      setIsLoading(false);
    }),
    ((error) => console.error(error)));
    return () => subscribe();
  }
  
  useEffect(() => {
    fetchMatchList()
  }, [athlete]);

return (
<Container>
<ImageBackground source={backgroundImage} resizeMode='stretch' style={{flex:1}}>
  <Header title="Jogos do Athlete"/>
  { isLoading 
          ? <ActivityIndicator size="large" style={{paddingTop:"30%"}}/>
          : <>
              <AthleteSelectButton 
                athlete={athlete}
                onPress={handleOpenSelectAthleteModal}
              />

              <FlatList
                data={matchList}
                renderItem={({ item }) => 
                  <GameCard options = {false}
                    data = {item}
                    onPressSel  ={() => handleCallGame({type: "View", ...item})}
                    onPressDel  ={() => handleCallGame({type: "View", ...item})}
                    onPressEdit ={() => handleCallGame({type: "View", ...item})}
                  />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{
                    paddingBottom: getBottomSpace(),
                }}
              />
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
  </>
  }
  </ImageBackground>
</Container>
)
}