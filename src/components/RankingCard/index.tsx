
import React from "react";

import { 
    Container,
    Title,
 } from './styles';

interface Props {position: number}

export function RankingCard({position}: Props){
    return (
        <Container>
            <Title>{position}</Title>
        </Container>
    )
}
