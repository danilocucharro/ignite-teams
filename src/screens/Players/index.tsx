import { Alert, FlatList, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Filter } from "@components/Filter";
import { Highlight } from "@components/Highlight";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { ButtonAddOrRemove } from "@components/ButtonAddOrRemove";
import { Loading } from "@components/Loading";

import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { addPlayerByGroup } from "@storage/player/addPlayerByGroup";
import { getPlayersByGroupAndTeam } from "@storage/player/getPlayersByGroupAndTeam";
import { deletePlayersByGroup } from "@storage/player/deletePlayerByGroup";
import { deleteGroup } from "@storage/group/deleteGroup";

import { AppError } from "@utils/AppError";

import { Container, Form, HeaderList, PlayersCount } from "./styles";

type RouteParams = {
  group: string;
}

export function Players() { 
  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState("")
  const [team, setTeam] = useState("Time A")
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  
  const newPlayerNameInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()

  const route = useRoute()
  const { group } = route.params as RouteParams

  async function handleAddNewPlayer() {
    if(newPlayerName.trim().length === 0) {
      return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa')
    }

    const newPlayer = {
      name: newPlayerName,
      team: team
    }

    try {
      await addPlayerByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur()

      fetchPlayersByTeam()
      setNewPlayerName("")
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Nova Pessoa', error.message)
      } else {
        Alert.alert('Nova Pessoa', 'Nao foi possivel adicionar')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)

      const playersByTeam = await getPlayersByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert('Pessoas', 'Nao foi possivel carregar o conteudo')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await deletePlayersByGroup(playerName, group)
      fetchPlayersByTeam()

    } catch (error) {
      console.log(error)
      Alert.alert('Remover', 'Nao foi possivel remover o player')
    }
  }

  async function handleRemoveGroup() {
    Alert.alert(
      'Remover',
      'Deseja remover a turma?',
      [
        { text: 'Nao', style: 'cancel' },
        { text: 'Sim', onPress: () => removeGroup()}
      ]
    )
  }

  async function removeGroup() {
    try {
      await deleteGroup(group)
      navigation.navigate('groups')

    } catch (error) {
      console.log(error)
      Alert.alert('Remover', 'Nao foi possivel remover a turma')
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return(
    <Container>
      <Header showBackButton />

      <Highlight 
        title={group}
        subTitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome do Integrante"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddNewPlayer}
          returnKeyType="done"
        />

        <ButtonAddOrRemove 
          icon="videogame-asset"
          onPress={handleAddNewPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={["Time A", "Time B"]}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <PlayersCount>
          {players.length}
        </PlayersCount>
      </HeaderList>

      {
        isLoading ? <Loading /> : (
          <FlatList 
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <PlayerCard 
                name={item.name}
                handleRemovePlayer={() => handleRemovePlayer(item.name)}
              />
            )}
            ListEmptyComponent={(
              <ListEmpty message="Nao ha pessoas nesse time" />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              {paddingBottom: 100},
              players.length === 0 && {flex: 1}
            ]}
          />
        )
      }

      <Button 
        title="Desfazer Turma"
        variant="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  )
}