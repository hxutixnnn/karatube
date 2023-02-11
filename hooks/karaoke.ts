import { useLocalStorage } from "react-use";
import { PlaylistItem } from "../types";

export function usePlaylist(initialValue?: PlaylistItem[]) {
  return useLocalStorage<PlaylistItem[]>("playlist", initialValue);
}
