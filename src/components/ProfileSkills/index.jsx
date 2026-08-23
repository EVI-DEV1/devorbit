import React from 'react';

import { Container, Title, List, Item } from './styles';

const ProfileSkills = ({ title = 'Habilidades', skills = [] }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <List>
        {skills.length === 0 && <Item as="span" style={{opacity:.6}}>Nenhuma habilidade cadastrada</Item>}
        {skills.map((skill) => (
          <Item key={skill}>{skill}</Item>
        ))}
      </List>
    </Container>
  );
};

export { ProfileSkills };
