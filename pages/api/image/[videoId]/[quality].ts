// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { videoId, quality } = req.query;
  const rawQuality = (quality as string).replace(".jpg", "");

  if (!videoId) {
    res.status(404).json({ error: "not found" });
  }

  try {
    const data = await fetch(
      `https://invidious.drivet.xyz/vi/${videoId}/${rawQuality}.jpg`
    );

    data.headers.forEach((value, name) => res.setHeader(name, value));

    res
      .status(data.status)
      .setHeader("Cache-Control", "max-age=31536000, immutable")
      .send(data.body);
  } catch (error) {
    res.status(500).json({ error: "failed to load data" });
  }
}
