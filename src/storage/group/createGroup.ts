import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { getGroups } from "./getGroups";
import { AppError } from "@utils/AppError";

export async function createGroup(newGroupName: string) {
  try {
    const groups = await getGroups();

    const isGroupAlreadyExists = groups.includes(newGroupName)

    if(isGroupAlreadyExists) {
      throw new AppError('Ja existe um grupo com esse nome!')
    }

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify([...groups, newGroupName]))

  } catch (error) {
    throw error
  }
}