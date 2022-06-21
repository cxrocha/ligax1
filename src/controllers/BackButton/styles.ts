import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-left: 5px;
`;