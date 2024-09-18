import { Container, PlayerName, PlayerIcon } from "./styles";

import { ButtonAddOrRemove } from "@components/ButtonAddOrRemove";

type PlayerCardProps = {
  name: string;
  handleRemovePlayer: () => void;
}

export function PlayerCard({ name, handleRemovePlayer }: PlayerCardProps) {
  return(
    <Container>
      <PlayerIcon name="person" />
      
      <PlayerName>
        {name}
      </PlayerName>

      <ButtonAddOrRemove 
        icon="close"
        variant="SECONDARY"
        onPress={handleRemovePlayer}
      />
    </Container>
  )
}