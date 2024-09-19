import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";
import { useState } from "react";

export function NewGroup() {
  const [groupName, setGroupName] = useState("")

  const navigation = useNavigation()

  function handleCreateNewGroup() {
    navigation.navigate('players', {group: groupName})
  }

  return(
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight 
          title="Nova Turma"
          subTitle="crie a turma para adicionar as pessoas"
        />

        <Input 
          placeholder="Nome da turma"
          onChangeText={setGroupName}
        />

        <Button 
          title="Criar"
          style={{marginTop: 26}}
          onPress={handleCreateNewGroup}
        />
      </Content>
    </Container>
  )
}