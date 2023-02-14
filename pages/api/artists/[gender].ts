// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import NhacCuaTui from "nhaccuatui-api-full";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let { gender } = req.query;
    if (Array.isArray(gender)) gender = gender[0];
    const artists = await NhacCuaTui.exploreArtists({
      nation: "hot",
      gender: parseInt(gender),
    });
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json(error);
  }
}
