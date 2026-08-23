import React from 'react';

import { Container, Title, List, Item, Name, Description, EmptyText } from './styles';

const ProfileProjects = ({ title = 'Projetos', projects = [] }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {projects.length === 0 ? (
        <EmptyText>Nenhum projeto cadastrado. Adicione em "Editar perfil".</EmptyText>
      ) : (
      <List>
        {projects.map((project) => (
          <Item key={project.name}>
            <Name>{project.name}</Name>
            <Description>{project.description}</Description>
          </Item>
        ))}
      </List>
      )}
    </Container>
  );
};

export { ProfileProjects };
