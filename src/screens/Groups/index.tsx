import { FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Loading } from '@components/Loading';
import { Button } from '@components/Button';

import { getGroups } from '@storage/group/getGroups';

import { Container } from './styles';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNavigateToNewGroup() {
    navigation.navigate("newGroups")
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const data = await getGroups()
      setGroups(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []))

  return (
    <Container>
      <Header />
      <Highlight 
        title="Turmas"
        subTitle="Jogue com a sua turma!"
      />
      
      {isLoading ? <Loading /> : (
        <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard 
              title={item} 
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={(
            <ListEmpty message="Voce ainda nao tem grupos criados." />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button 
        title="Criar nova turma"
        onPress={handleNavigateToNewGroup}
      />
    </Container>
  );
}