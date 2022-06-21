import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Search } from '../../components/Search';
import { EtapaCard } from '../../components/EtapaCard';
import { useFocusEffect } from '@react-navigation/native';
import { BackButton } from '../../controllers/BackButton';

import {
  Container,
  Title,
  MenuHeader,
  MenuItemsNumber,
  Header
} from './styles';
import { DefaultBackground } from '../../components/DefaultBackground';

interface EtapaProps {
  sDate: string,
  title: string,
  isOpen: boolean,
}

interface Props {
  etapa: EtapaProps;
  setEtapa: (etapa: EtapaProps) => void;
  closeSelectEtapa: () => void;
}

export function EtapaSelect({
  etapa,
  setEtapa, 
  closeSelectEtapa
}: Props) {


  const [etapas, setEtapas] = useState<EtapaProps[]>([]);
  const [search, setSearch] = useState(etapa.title);

  const [isLoading, setIsLoading] = useState(false);

  function fetchEtapas(value: string) {
    const formattedValue = value.trim();
    setIsLoading(true);
    firestore()
      .collection('etapa')
      .orderBy('title','desc')
      .startAt(`${value}\uf8ff`)
      .endAt(value)
//      .where("isOpen","==",true)
      .get()
      .then(response => {
        const data = response.docs.map(doc => {
          return {
            ...doc.data(),
          }
        }) as EtapaProps[];
        setEtapas(data);
        
      })
      .catch(() => Alert.alert('Consulta', 'Não foi possível realizar a consulta'))
      .finally(() => setIsLoading(false));
    }

  useEffect(() => {
    fetchEtapas(search)
  }, [search])


  function handleSearchClear() {
    setSearch('');
    fetchEtapas('');
  }

  function handleEtapaSelect(etapa: EtapaProps){

    setEtapa(etapa);
    closeSelectEtapa();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container>
      <DefaultBackground>
        <Header>
          <BackButton title="" icon="arrow-back" onPress={() => closeSelectEtapa()} />
          <Search
            onChangeText={setSearch}
            value={search}
            onClear={handleSearchClear}
          />
        </Header>        
        <MenuHeader>
          <Title>Etapas</Title>
          <MenuItemsNumber>{etapas.length} etapas</MenuItemsNumber>
        </MenuHeader>
        <FlatList
          data={etapas}
          keyExtractor={item => item.sDate}
          renderItem={({ item }) => (
            <EtapaCard
              title = {item.title}
              isActive = {true}
              onPress={() => handleEtapaSelect({sDate:item.sDate, title: item.title, isOpen:item.isOpen})} 
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 5,
            paddingBottom: 125,
            marginHorizontal: 24,
            alignSelf: 'center'
          }}
        />
        </DefaultBackground>
      </Container>
    </GestureHandlerRootView>
  )
}