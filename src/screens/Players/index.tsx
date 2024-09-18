import { FlatList } from "react-native";
import { useState } from "react";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Filter } from "@components/Filter";
import { Highlight } from "@components/Highlight";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { ButtonAddOrRemove } from "@components/ButtonAddOrRemove";

import { Container, Form, HeaderList, PlayersCount } from "./styles";

export function Players() { 
  const [team, setTeam] = useState("Time A")
  const [players, setPlayers] = useState(["rodri", "daniel", "michael"])

  return(
    <Container>
      <Header showBackButton />

      <Highlight 
        title="Nome da turma"
        subTitle="adicione a galera e separe os times"
      />

      <Form>
        <Input 
          placeholder="Nome do Integrante"
          autoCorrect={false}
        />

        <ButtonAddOrRemove 
          icon="videogame-asset"
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
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item}
            handleRemovePlayer={() => {}}
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