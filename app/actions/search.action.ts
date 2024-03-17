"use server";

import youtube from "../utils/youtube";
import { ClientType, Innertube, Misc, Player } from "youtubei.js";

export async function youtubeSearch(query: string = "") {
  const searchTerm = `${query} "karaoke" tone nam nữ`;
  const res = await youtube.search(searchTerm, { type: "video" });
  return res.items.map(({ id, title, thumbnails }) => ({
    id,
    title,
    thumbnail: thumbnails[0].url,
    // description,
    // duration,
    // thumbnails,
    // channelName: channel?.name,
    // viewCount,
  }));
}

export async function youtubeSearchAction(prevState: any, formData: FormData) {
  try {
    const data = await youtubeSearch(formData.get('query') as string);
    return {
      data,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: JSON.parse(JSON.stringify(error))
    }
  }
}

export async function getVideoInfo(
  id: string
): Promise<{ data: string | null; error: string | null }> {
  try {
    const innertube = await Innertube.create({
      retrieve_player: true,
      location: undefined,
      enable_safety_mode: false,
      client_type: ClientType.TV_EMBEDDED,

      // @ts-expect-error use browser fetch
      fetch: (input, init) => fetch(input, init),
      cache: undefined,
      generate_session_locally: false,
    });
    const player = innertube.actions.session.player;

    // the second request that getInfo makes 404s with the bypass, so we use getBasicInfo instead
    // that's fine as we have most of the information from the original getInfo request
    const info = await innertube.getBasicInfo(id, "TV_EMBEDDED");
    if (info.streaming_data) {
      decipherFormats(info.streaming_data.adaptive_formats, player);
      decipherFormats(info.streaming_data.formats, player);
    }
    const format = info.streaming_data?.formats[0];
    // @ts-expect-error customUrl
    const url = format["customUrl"] ?? format?.url;
    return { data: url, error: null };
  } catch (error) {
    return { data: null, error: JSON.parse(JSON.stringify(error)) };
  }
}

interface CustomFormat extends Misc.Format {
  customUrl?: string;
}

function decipherFormats(formats: CustomFormat[], player?: Player) {
  for (const format of formats) {
    // toDash deciphers the format again, so if we overwrite the original URL,
    // it breaks because the n param would get deciphered twice and then be incorrect
    format.customUrl = format.decipher(player);
  }
}
