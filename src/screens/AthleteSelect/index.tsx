import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Search } from '../../components/Search';
import { AthleteCard } from '../../components/AthleteCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  HeaderBar,
  MenuHeader,
  MenuItemsNumber,
} from './styles';
import { DefaultBackground } from '../../components/DefaultBackground';
import { BackButton } from '../../controllers/BackButton';
import { Button } from '../../components/Forms/Button';
import { AthleteProps } from '../../@types/interface'
import { AthleteInsertNavigationProps } from '../../@types/navigation'

interface Props {
  athlete: AthleteProps;
  setAthlete: (athlete: AthleteProps) => void;
  closeSelectAthlete: () => void;
}

export function AthleteSelect({
  athlete,
  setAthlete, 
  closeSelectAthlete
}: Props) {

  const [athletes, setAthletes] = useState<AthleteProps[]>([]);
  const [search, setSearch] = useState(athlete.name);

  const navigation = useNavigation();

  async function fetchAthletes(value: string) {
    const formattedValue = value.trim();

    firestore()
      .collection('athletes')
      .orderBy('name')
      .startAt(value)
      .endAt(`${value}\uf8ff`)
      .get()
      .then(response => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as AthleteProps[];
        setAthletes(data);
      })
      .catch(() => Alert.alert('Consulta', 'Não foi possível realizar a consulta'));
  }

  useEffect(() => {
    fetchAthletes(search)
  }, [search])


  function handleSearchClear() {
    setSearch('');
    fetchAthletes('');
  }

  function handleAthleteSelect(athlete: AthleteProps){
    setAthlete(athlete);
    closeSelectAthlete();
  }

    function handleCallAthleteRegister(params: AthleteInsertNavigationProps) {
    closeSelectAthlete();
    navigation.navigate('athleteInsert', params);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container>
        <DefaultBackground>
          <HeaderBar>
            <BackButton title="" icon="arrow-back" onPress={() => closeSelectAthlete()} />
            <Search
              onChangeText={setSearch}
              value={search}
              onClear={handleSearchClear}
            />
          </HeaderBar>
        <MenuHeader>
          <Title>Atletas</Title>
          <MenuItemsNumber>{athletes.length} atletas</MenuItemsNumber>
        </MenuHeader>
        <FlatList
          data={athletes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AthleteCard options = {true}
              data = {item}
              onPressSel  ={() => handleAthleteSelect({id:item.id, name:item.name, nickName:item.nickName, eMail:item.eMail, bornDate:item.bornDate, gendler:item.gendler})}
              onPressView ={() => handleCallAthleteRegister({type: "View", id:item.id, name:item.name, nickName:item.nickName, eMail:item.eMail, bornDate:item.bornDate, gendler:item.gendler})}
              onPressDel  ={() => handleCallAthleteRegister({type: "Del",  id:item.id, name:item.name, nickName:item.nickName, eMail:item.eMail, bornDate:item.bornDate, gendler:item.gendler})}
              onPressEdit ={() => handleCallAthleteRegister({type: "Edit", id:item.id, name:item.name, nickName:item.nickName, eMail:item.eMail, bornDate:item.bornDate, gendler:item.gendler})}
            />
          )}


          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 5,
            paddingBottom: 125,
            marginHorizontal: 24
          }}
        />
        <Button 
          title='Incluir Atleta'
          onPress={() => handleCallAthleteRegister({type: "Add", id:"", name:"", nickName:"", eMail:"", bornDate:"", gendler:"M"})}
        />
        </DefaultBackground>
      </Container>
    </GestureHandlerRootView>
  )
}