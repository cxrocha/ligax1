import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { Header } from '../../components/Header';
import { GameCard } from '../../components/GameCard';
import { GameProps, AthleteProps } from '../../@types/interface';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GameInsertNavigationProps } from '../../@types/navigation';
import { TitleDataText } from '../../components/TitleDataText';
import { BackBar, Container, ContainerAthleteData, Load } from './styles';
import { BackButton } from '../../controllers/BackButton';
import { FlatList } from 'react-native-gesture-handler';

import backgroundImage from '../../assets/images/background.png';

type GameOptionProps = {type: string} & GameProps;

export function AthleteDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id, name, nickName, eMail, bornDate, gendler} = route.params as AthleteProps;
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [matchList1, setMatchList1] = useState<GameProps[]>([]);
  const [matchList2, setMatchList2] = useState<GameProps[]>([]);

  function fetchMatchList1() {    
    setIsLoading1(true);
    setMatchList1([]);
    const subscribe = firestore()
      .collection('games')
      .where('athlete1.id','==', id)
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
      setMatchList1(data);
      setIsLoading1(false);
    }),
    ((error) => console.error(error)));
    return () => subscribe();
  }

  function fetchMatchList2() {    
    setIsLoading2(true);
    setMatchList2([]);
    const subscribe = firestore()
      .collection('games')
      .where('athlete2.id','==', id)
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
      setMatchList2(data);
      setIsLoading2(false);
    }),
    ((error) => console.error(error)));
    return () => subscribe();
  }

  useEffect(() => {
    fetchMatchList1(), 
    fetchMatchList2()
  }, []);

  function handleCallGame(gameDataNavigation: GameInsertNavigationProps) {
    navigation.navigate('gameInsert', gameDataNavigation)
  };
  
  function handleGoBack() {
    navigation.goBack();
  };

return (
<Container>
  <ImageBackground source={backgroundImage} resizeMode='stretch' style={{flex:1}}>
  <BackBar>
      <BackButton title="Voltar" icon="arrow-back" onPress={() => handleGoBack()} />
  </BackBar>
  <Header title='Detalhes do Atleta'/>
  <ContainerAthleteData>
    <TitleDataText title='Nome completo: ' data={name} />
    <TitleDataText title='Apelido: ' data={nickName} />
    <TitleDataText title='E-Mail: ' data={eMail} />
    <TitleDataText title='Data de Nascimento: ' data={bornDate} />
    <TitleDataText title='Sexo: ' data={gendler} />
  </ContainerAthleteData>
  { (isLoading1 || isLoading2)
    ? <Load size="large" style={{paddingTop:"30%"}}/>
    : <FlatList
        data={matchList1.concat(matchList2)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GameCard options = {false}
            data = {item}
            onPressSel  ={() => handleCallGame({type: "View", ...item})}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle = {{
            paddingBottom: getBottomSpace(),
        }}
      />
  }
  </ImageBackground>
</Container>
)
}