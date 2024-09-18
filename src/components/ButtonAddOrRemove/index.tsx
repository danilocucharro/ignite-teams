import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"

import { Container, Icon, ButtonAddOrRemoveStyleProps } from "./styles";

type ButtonAddOrRemoveProps = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  variant?: ButtonAddOrRemoveStyleProps;
}

export function ButtonAddOrRemove({ icon, variant = 'PRIMARY', ...rest }: ButtonAddOrRemoveProps) {
  return(
    <Container {...rest}>
      <Icon name={icon} variant={variant} />
    </Container>
  )
}