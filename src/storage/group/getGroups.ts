import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function getGroups() {
  try {
    const groupsStoraged = await AsyncStorage.getItem(GROUP_COLLECTION)

    const groupsData: string[] = groupsStoraged ? JSON.parse(groupsStoraged) : []

    return groupsData;
  } catch (error) {
    throw error;
  }
}