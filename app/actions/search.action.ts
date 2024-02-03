"use server";

import { Thumbnails } from "youtubei";
import youtube from "../utils/youtube";

export interface Result {
  id: string;
  title: string;
  description: string;
  duration: number | null;
  thumbnails: Thumbnails;
  channelName?: string;
  viewCount?: number | null;
}
interface Response {
  data: Result[];
  error: any;
}
export const searchAction = async (
  prevState: Response,
  formData: FormData
): Promise<Response> => {
  try {
    const query = formData.get("query") as string;
    const searchTerm = `${query} "karaoke" tone nam nữ`;
    const res = await youtube.search(searchTerm, { type: "video" });

    return {
      data: res.items.map(
        ({
          id,
          title,
          description,
          duration,
          thumbnails,
          channel,
          viewCount,
        }) => ({
          id,
          title,
          description,
          duration,
          thumbnails,
          channelName: channel?.name,
          viewCount,
        })
      ),
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error,
    };
  }
};
