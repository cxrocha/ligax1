export interface EtapaProps {
  sDate: string,
  title: string,
  isOpen: boolean,
}

export interface AthleteProps {
  id: string,
  name: string,
  nickName: string,
  eMail: string,
  bornDate: string,
  gendler: string,
}

export interface GameProps {
  id:string, 
  etapa: EtapaProps, 
  athlete1: AthleteProps, 
  athlete2: AthleteProps, 
  set1: { player1: string, player2: string },
  set2: { player1: string, player2: string },
  set3: { player1: string, player2: string },
  };