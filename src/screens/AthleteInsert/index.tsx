import React, {useState, useEffect} from 'react';
import { 
    Keyboard,
    Alert} from 'react-native'

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
    Title,
    Form,
    Fields,
    GenderOptions,
    BackBar
} from './styles';

import { GenderButton } from '../../components/Forms/GenderButton';
import { BackButton } from '../../controllers/BackButton';
import { DefaultBackground } from '../../components/DefaultBackground';
import { Header } from '../../components/Header';
import { AthleteInsertNavigationProps } from '../../@types/navigation';



interface FormData {
    name: string;
    nickName: string;
    eMail: string;
    bornDate: string;
}

const schema = Yup.object().shape({
    name:     Yup.string().required('O NOME é obrigatório'),
    nickName: Yup.string().required('O APELIDO é obrigatório'),
    eMail:    Yup.string().required('O EMAIL é obrigatório'),
    bornDate: Yup.string().required('A DATA DE NASCIMENTO é obrigatória')
});

export function AthleteInsert() {
    const navigation = useNavigation();
    const route = useRoute();
    const {type, id, name, nickName, eMail, bornDate, gendler}  = route.params as AthleteInsertNavigationProps;

    const[gendler1, setGendler1] = useState(gendler);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    }  = useForm({
            defaultValues: { 
                name:     name, 
                nickName: nickName, 
                eMail:    eMail, 
                bornDate: bornDate
            },
            resolver: yupResolver(schema),
    });

    function handleGenderSelect(gendler: string) {
        setGendler1(gendler);
    }
  
    function handleGoBack() {
        navigation.goBack();
    }

    function handleAthleteDel() {
    firestore().collection('athletes').doc(id).delete()
    .then(()=> { Alert.alert('Atleta apagado com sucesso!');
    })
    .catch((error) => console.log(error))
    .finally(()=>navigation.goBack())
    }

    function handleAthleteEdit(form: FormData) {
        firestore().collection('athletes').doc(id).update({
            name: form.name,
            nickName: form.nickName,
            eMail: form.eMail,
            bornDate: form.bornDate,
            gendler: gendler1
        })
        .then(()=> { Alert.alert('Atleta alterado com sucesso!');
        })
        .catch((error) => console.log(error))
        .finally(()=>navigation.goBack())
    }

    function handleAthleteAdd(form: FormData) {
        if(!gendler1) return Alert.alert('Selecione o sexo');
        firestore().collection('athletes')
        .add({
            name: form.name,
            nickName: form.nickName,
            eMail: form.eMail,
            bornDate: form.bornDate,
            gendler: gendler1, 
            createAt: firestore.FieldValue.serverTimestamp()
        })
        .then(()=> {
            reset();
            setGendler1('M');
            Alert.alert('Atleta adicionado com sucesso!');
        })
        .catch((error) => console.log(error))    
        .finally(()=>navigation.goBack())
    }
    
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <Container>
          <DefaultBackground>
            <BackBar>
                <BackButton title="Voltar" icon="arrow-back" onPress={() => handleGoBack()} />
            </BackBar>
            <Header title="Cadastro"/>
            <Form>
                <Fields>
                    <InputForm
                        editable = {type=='Add' || type=='Edit'}
                        name="name"
                        control={control}
                        placeholder='Nome'
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.name && errors.name.message}
                    />
                    <InputForm
                        editable = {type=='Add' || type=='Edit'}
                        name="nickName"
                        control={control}
                        placeholder='Apelido'
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.nickName && errors.nickName.message}
                    />
                    <InputForm
                        editable = {type=='Add' || type=='Edit'}
                        name="eMail"
                        control={control}
                        placeholder='Email'
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.eMail && errors.eMail.message}
                    />
                    <InputForm
                        editable = {type=='Add' || type=='Edit'}
                        name="bornDate"
                        control={control}
                        placeholder='Born Date'
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.bornDate && errors.bornDate.message}
                    />
                    <GestureHandlerRootView>
                        <GenderOptions>
                            <GenderButton
                                enabled = {(type=='Add' || type=='Edit')}
                                type='M' 
                                title='Masculino'
                                isActive={gendler1 === 'M'}
                                onPress={() => handleGenderSelect('M')}
                            />
                            <GenderButton 
                                enabled = {(type=='Add' || type=='Edit')}
                                type='F' 
                                title='Feminino'
                                isActive={gendler1 === 'F'}
                                onPress={() => handleGenderSelect('F')}
                            />
                        </GenderOptions>
                    </GestureHandlerRootView>

                </Fields>
                <Button 
                    title = { type=='Add' ? 'Gravar' 
                            : type=='Edit' ? 'Aterar' 
                            : type=='View' ? 'Fechar' 
                            : 'Apagar'}
                    onPress = { type=='Add' ? handleSubmit(handleAthleteAdd) 
                              : type=='Edit' ? handleSubmit(handleAthleteEdit)
                              : type=='View' ? handleGoBack
                              : handleAthleteDel }
                />
            </Form>
            </DefaultBackground>
        </Container>
        </GestureHandlerRootView>
    )
}

