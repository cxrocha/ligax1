import { AthleteProps } from "./interface";
import { GameProps } from "./interface";

export type ProductNavigationProps = {
  id?: string;
}

export type RankingInsertNavigationProps = {
  sDate: string;
}

export type GameInsertNavigationProps = { type: string } & GameProps;

export type AthleteInsertNavigationProps = { type: string } & AthleteProps;

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      athleteInsert: AthleteInsertNavigationProps;
      rankingInsert: RankingInsertNavigationProps;
      rankingList: undefined;
      UserTabRoutes: undefined;
      signIn: undefined;
      userInsert: undefined;
      gameList: undefined;
      gameInsert: GameInsertNavigationProps;
    }
  }
}
