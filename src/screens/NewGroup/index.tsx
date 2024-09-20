import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { AppError } from "@utils/AppError";

import { createGroup } from "@storage/group/createGroup";

import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [groupName, setGroupName] = useState("")

  const navigation = useNavigation()

  async function handleCreateNewGroup() {
    try {
      if(groupName.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da Turma")
      }

      await createGroup(groupName)
      navigation.navigate('players', {group: groupName})

    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Nao foi possivel criar um novo grupo");
        console.log(error)
      }
    }
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