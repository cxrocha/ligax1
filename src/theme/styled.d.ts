import 'styled-components/native';
import theme from '.';

declare module 'styled-componets' {
    type ThemeType = typeof theme
    
    export interface DefaultTheme extends ThemeType {}
}

import { SafeAreaView as SafeAreaViewContainer } from 'react-native';

export const SafeAreaView = styled(SafeAreaViewContainer)`
  flex: 1;
`