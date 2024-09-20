import AsyncStorage from "@react-native-async-storage/async-storage";

import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_COLLECTION } from "@storage/storageConfig";

export async function getPlayersByGroup(group: string) {
  try {
    const playersStoraged = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)

    const playersData: PlayerStorageDTO[] = playersStoraged ? JSON.parse(playersStoraged) : []

    return playersData
  } catch (error) {
    throw error
  }
}