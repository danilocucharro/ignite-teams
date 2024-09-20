import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { getPlayersByGroup } from "./getPlayersByGroup";

export async function deletePlayersByGroup(playerName: string, group: string) {
  try {
  const playersStoraged = await getPlayersByGroup(group)

  const newPlayersList = playersStoraged.filter(player => player.name !== playerName)

  AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(newPlayersList))

  } catch (error) {
    throw error
  }
}