import { Alert, FlatList, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Filter } from "@components/Filter";
import { Highlight } from "@components/Highlight";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { ButtonAddOrRemove } from "@components/ButtonAddOrRemove";

import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { addPlayerByGroup } from "@storage/player/addPlayerByGroup";
import { getPlayersByGroupAndTeam } from "@storage/player/getPlayersByGroupAndTeam";
import { deletePlayersByGroup } from "@storage/player/deletePlayerByGroup";

import { AppError } from "@utils/AppError";

import { Container, Form, HeaderList, PlayersCount } from "./styles";

type RouteParams = {
  group: string;
}

export function Players() { 
  const [newPlayerName, setNewPlayerName] = useState("")
  const [team, setTeam] = useState("Time A")
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  
  const newPlayerNameInputRef = useRef<TextInput>(null)

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
      const playersByTeam = await getPlayersByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert('Pessoas', 'Nao foi possivel carregar o conteudo')
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await deletePlayersByGroup(playerName, group)
      fetchPlayersByTeam()

    } catch (error) {
      throw error
      console.log(error)
      Alert.alert('Remover', 'Nao foi possivel remover o player')
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

      <Button 
        title="Desfazer Turma"
        variant="SECONDARY"
      />
    </Container>
  )
}