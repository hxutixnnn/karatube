
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import NhacCuaTui from "nhaccuatui-api-full";

const baseUrl = process.env.NEXT_PUBLIC_INVIDIOUS_URL ?? ''

async function getTrendingVideos() {
  return fetch('/api/v1/trending')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const topics = await getTrendingVideos();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json(error);
  }
}
