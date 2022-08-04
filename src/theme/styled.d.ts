import 'styled-components';
import theme from '.';

declare module 'styled-components' {
    type ThemeType = typeof theme;
    
    export interface DefaultTheme extends ThemeType {}
}

import { SafeAreaView as SafeAreaViewContainer } from 'react-native';

export const SafeAreaView = styled(SafeAreaViewContainer)`
  flex: 1;
`