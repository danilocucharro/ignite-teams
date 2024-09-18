import styled from "styled-components/native"
import { MaterialIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native";

export type ButtonAddOrRemoveStyleProps = 'PRIMARY' | 'SECONDARY';

type ButtonProps = {
  variant: ButtonAddOrRemoveStyleProps
}

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<ButtonProps>(({ theme, variant }) => ({
  size: 24,
  color: variant === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED
}))``;