import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";

import { getGroups } from "./getGroups"

export async function deleteGroup(groupName: string) {
try {
  const groupsStoraged = await getGroups()
  const newGroupList = groupsStoraged.filter(group => group !== groupName)

  await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(newGroupList))
  await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)
  
} catch (error) {
  throw error
}}