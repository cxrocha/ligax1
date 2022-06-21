import React from 'react';

import { Container, Icon, Title, Notification, Quantity } from './styles';


type Props = {
  size: number;
  icon: string;
  title: string;
  color: string;
  notifications?: string | undefined;
}

export function BottomMenu({ size, icon, title, color, notifications }: Props) {
  const noNotifications = notifications === '0';

  return (
    <Container>
      <Icon name={icon}
        size={size}
        color={color}
      />
      <Title color={color}>{title}</Title>
      {
        notifications && (
          <Notification noNotifications={noNotifications}>
            <Quantity noNotifications={noNotifications}>
              {notifications}
            </Quantity>
          </Notification>
        )
      }
    </Container>
  )
}