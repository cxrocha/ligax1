
import backgroundImage from '../../assets/images/background.png';
import styled from 'styled-components/native';

export const DefaultBackground = styled.ImageBackground.attrs({
    resizeMode: 'stretch',
    source: backgroundImage,
  })`
  flex: 1;
`;

