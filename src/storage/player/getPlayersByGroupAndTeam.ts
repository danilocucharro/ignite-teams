import { getPlayersByGroup } from "./getPlayersByGroup";

export async function getPlayersByGroupAndTeam(group: string, team: string) {
  try {
    const playersStoraged = await getPlayersByGroup(group);

    const playersData = playersStoraged.filter(player => player.team === team);

    return playersData;
  } catch (error) {
    throw error
  }
}