import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";


export const Container = styled.View`
  background-color: ${({theme})=>theme.COLORS.SHAPE};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    margin: 18px 16px;
    margin-top: 0px;
    height: 32px;
    width: ${RFValue(60)}px;
`;

export const Input = styled(TextInput)`
  margin-left: 7px;
`;