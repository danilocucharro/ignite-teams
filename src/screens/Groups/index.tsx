import { FlatList } from 'react-native';
import { useState } from 'react';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';

export function Groups() {
  const [groups, setGeoups] = useState<string[]>([])

  return (
    <Container>
      <Header />
      <Highlight 
        title="Turmas"
        subTitle="Jogue com a sua turma!"
      />
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={(
          <ListEmpty message="Voce ainda nao tem grupos criados." />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button 
        title="Criar nova turma"
      />
    </Container>
  );
}