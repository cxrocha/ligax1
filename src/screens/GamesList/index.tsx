import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { Header } from '../../components/Header';
import { EtapaSelectButton } from '../../components/Forms/EtapaSelectButton';
import { GameCard } from '../../components/GameCard';
import { GameProps, EtapaProps } from '../../../src/@types/interface';

import { EtapaSelect } from '../EtapaSelect';

import { Container, Title } from './styles';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation } from '@react-navigation/native';
import { GameInsertNavigationProps } from '../../@types/navigation';

import backgroundImage from '../../assets/images/background.png';
import { ButtonConfirm } from '../../components/ButtonConfirm';

type GameOptionProps = {type: string} & GameProps;


export function GamesList() {
  const [etapaSel, setEtapaSel] = useState<EtapaProps>({ sDate: '', title: '', isOpen:true});
  const[etapaModalOpen, setEtapaModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [matchList, setMatchList] = useState<GameProps[]>([]);

  const navigation = useNavigation();

  function handleOpenSelectEtapaModal()  { setEtapaModalOpen(true); }
  function handleCloseSelectEtapaModal() { setEtapaModalOpen(false); }
  function handleGameSelect(game: GameProps) {};

  function handleCallGameNew(type: string) {
    navigation.navigate('gameInsert', {type, id: "",
      etapa: etapaSel,
      athlete1: {id: "", name: "", nickName: "", eMail: "", bornDate: "", gendler: ""},
      athlete2: {id: "", name: "", nickName: "", eMail: "", bornDate: "", gendler: ""},
      set1: {player1: "", player2: ""},
      set2: {player1: "", player2: ""},
      set3: {player1: "", player2: ""},
    } as GameInsertNavigationProps)
  };

  function handleCallGame(gameDataNavigation: GameInsertNavigationProps) {
    navigation.navigate('gameInsert', gameDataNavigation)
  };

  function fetchMatchList() {    
    setIsLoading(true);
    setMatchList([]);
    const subscribe = firestore()
      .collection('games')
      .where('etapa.title','==',etapaSel.title)
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
  }, [etapaSel]);

return (
<Container>
  <ImageBackground source={backgroundImage} resizeMode='stretch' style={{flex:1}}>
    <Header title="Lista de Jogos"/>
    <EtapaSelectButton 
      title={etapaSel.title}
      onPress={handleOpenSelectEtapaModal}
    />
    { isLoading 
      ? <ActivityIndicator size="large" style={{paddingTop:"30%"}}/>
      : matchList.length > 0
        ? <FlatList
            data={matchList}
            renderItem={({ item }) => 
              <GameCard options = {true}
                data = {item}
                onPressSel  ={() => handleCallGame({type: "View", ...item})}
                onPressDel  ={() => handleCallGame( {type: "Del" , ...item})}
                onPressEdit ={() => handleCallGame({type: "Edit", ...item})}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle = {{
                paddingBottom: getBottomSpace(),
            }}
          />
        : <></>
    }
    <ButtonConfirm
      title='Incluir Jogo'
      onPress={() => handleCallGameNew("Add")}
    />
    <Modal 
      visible={etapaModalOpen} 
      transparent={true}
      animationType="slide">
        <EtapaSelect 
            etapa = {etapaSel}
            setEtapa = {setEtapaSel}
            closeSelectEtapa = {handleCloseSelectEtapaModal}
        />
    </Modal>
  </ImageBackground>
</Container>
)
}