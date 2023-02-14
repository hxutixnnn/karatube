import { useLocalStorageValue } from "@react-hookz/web";

export function useKaraokeState() {
  const { value: playlist, set: setPlaylist } = useLocalStorageValue(
    "playlist",
    { defaultValue: [] }
  );
  const { value: curVideoId, set: setCurVideoId } = useLocalStorageValue(
    "videoId",
    { defaultValue: "" }
  ); // TODO: make a video instruction and put it as a initial here

  const { value: searchTerm, set: setSearchTerm } = useLocalStorageValue(
    "searchTerm",
    { defaultValue: "" }
  );
  const { value: isKaraoke, set: setIsKaraoke } = useLocalStorageValue(
    "isKaraoke",
    { defaultValue: true }
  );
  const { value: activeIndex, set: setActiveIndex } = useLocalStorageValue(
    "bottomNavActiveIndex",
    { defaultValue: 0 }
  );

  return {
    playlist,
    curVideoId,
    searchTerm,
    isKaraoke,
    activeIndex,
    setPlaylist,
    setCurVideoId,
    setSearchTerm,
    setIsKaraoke,
    setActiveIndex,
  };
}
