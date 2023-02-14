// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import NhacCuaTui from "nhaccuatui-api-full";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const topics = await NhacCuaTui.getTopics();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json(error);
  }
}
