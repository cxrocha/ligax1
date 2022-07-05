import React, {useEffect, useState, useCallback} from 'react';
import { FlatList, Alert, ActivityIndicator } from 'react-native';
import { getBottomSpace} from 'react-native-iphone-x-helper';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { EtapaCard } from '../../components/EtapaCard';
import { RankingAthleteCard } from '../../components/RankingAthleteCard';

import { Container, ContainerActivityIndicator, HorizontalContainerFlatList} from './styles';

import { RankingAthleteProps } from '../../components/RankingAthleteCard'
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Forms/Button';

import { Header } from '../../components/Header';

import { DefaultBackground } from '../../components/DefaultBackground';

interface EtapaCardProps {
    id: string,
    sDate: string,
    title: string
  }

export function RankingList(){

  const[etapaSDate, setEtapaSDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rankingAthletes, setRankingAthletes] = useState<RankingAthleteProps[]>([]);
  const { user, signOut } = useAuth()
  const [etapas, setEtapas] = useState<EtapaCardProps[]>([]);
  const navigation = useNavigation();

  function handleInsertRanking(sDate: string) {
    if (sDate==="") { return Alert.alert("Para incluir ranking, uma etada deve ser selecionada !"); } ;
    navigation.navigate('rankingInsert', {sDate});
  };

  function handleSelectEtapa(sDate: string){
    setEtapaSDate(sDate);
  };

  async function fetchEtapas() {
    setIsLoading(true);
    setEtapas([]);
    const subscribe = await firestore()
    .collection('etapa')
    .orderBy('title','desc')
    .onSnapshot(querySnapshot => { 
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,  
          ...doc.data(),
        }
      }) as EtapaCardProps[];
      setEtapas(data);   
      setIsLoading(false);
      }, (error) => { console.log("Error fechEtapas: ", error); }
    );
    return () => subscribe();
  }

  async function fetchRankingAthletes() {  
    setIsLoading(true);
    setRankingAthletes([]);
    const subscribe = await firestore()
      .collection('rankings')
      .orderBy('position')
      .where('date','==',etapaSDate)
      .onSnapshot(querySnapshot => { 
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            date: doc.data().date,
            position: doc.data().position,
            athleteId: doc.data().athlete.athleteId,
            name: doc.data().athlete.name,
            nickName: doc.data().athlete.nickName,
            gendler: doc.data().athlete.gendler,
          }
      }) as RankingAthleteProps[];
      setRankingAthletes(data);
      setIsLoading(false);
      }, (error) => { console.log("Error fechEtapas: ", error); }
    );
    return () => subscribe();
  }

 useEffect(() => {
    fetchEtapas();
  }, []);

//  useEffect(() => {
  if ((etapaSDate=="") && (etapas.length > 0)) { setEtapaSDate(etapas[0].sDate); };
  //  }, [etapas]);
  
    useEffect(() => {
    fetchRankingAthletes()
  }, [etapaSDate]);


/*
  useFocusEffect(
    useCallback(() => {
      fetchRankingAthletes();
    }, [])
  );
*/

return (
  <Container>
    <DefaultBackground>
        <Header title="Lista do Ranking"/>
        <HorizontalContainerFlatList>
          <FlatList
            horizontal = {true}
            data = {etapas}
            keyExtractor={item => item.sDate}
            renderItem = {({item}) => 
                <EtapaCard 
                    isActive={item.sDate === etapaSDate}
                    title={item.title} 
                    onPress = {() => handleSelectEtapa(item.sDate)} 
                />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
          />
        </HorizontalContainerFlatList>
        { isLoading 
          ? <ActivityIndicator size="large" style={{paddingTop:"30%"}}/>
          : <FlatList
                data={rankingAthletes}
                renderItem={({ item }) => 
                    <RankingAthleteCard 
                        data={item} 
                    />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{
                    paddingBottom: getBottomSpace(),
                }}
            />
        }    
      { 
        user?.isAdmin && 
        <Button 
          title='Incluir Ranking'
          onPress = { () => handleInsertRanking(etapaSDate) }/> 
      }
                    
    </DefaultBackground>
  </Container> 
  )
}