import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

import { getPlayersByGroup } from "./getPlayersByGroup";

export async function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const players = await getPlayersByGroup(group)

    const isPlayerAlreadyExists = players.filter(player => player.name === newPlayer.name)

    if(isPlayerAlreadyExists.length > 0) {
      throw new AppError("Essa pessoas ja esta presente em um time aqui.")
    } 

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify([...players, newPlayer]))
  } catch (error) {
    throw error
  }
}