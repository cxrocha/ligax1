import React from 'react';
import { FlatList } from 'react-native';
import { genders } from '../../utils/genders';

import { 
    Container,
    Header,
    Title,
    Gender,
    Icon,
    Name,
    Separator,
    Footer,

 } from './styles';
import { ButtonConfirm } from '../../components/ButtonConfirm';

interface Gender {
    key: string,
    name: string,
}

interface Props {
    gender: Gender;
    setGender: (gender: Gender) => void;
    closeSelectGender: () => void;
}

export function GenderSelect({
    gender,
    setGender, 
    closeSelectGender
}: Props){

    function handleCategorySelect(gender: Gender){
        setGender(gender);
    }
    return(
        <Container>
          <FlatList
            data={genders}
            style={{flex:1, width: '100%'}}
            keyExtractor={(item)=>item.key}
            renderItem={({ item}) => (
                <Gender 
                    onPress = {() =>handleCategorySelect(item)}
                    isActive={gender.key === item.key}    
                >
                    <Icon name={item.icon} />
                    <Name>{item.name}</Name>
                </Gender>
            )}
            ItemSeparatorComponent={()=> <Separator/>}
          />
          <Footer>
            <ButtonConfirm
                title="Selecionar"
                onPress={closeSelectGender}
            />
          </Footer>
        </Container>
    )

}