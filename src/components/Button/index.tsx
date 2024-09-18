import { ButtonVariantStyleProps, Container, Title } from "./styles";

import { TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps &{
  title: string
  variant?: ButtonVariantStyleProps
}

export function Button({ 
  title,
  variant = 'PRIMARY', 
  ...rest }: ButtonProps) {
  return(
    <Container variant={variant} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}