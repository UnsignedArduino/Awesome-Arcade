import { NextApiRequest, NextApiResponse } from "next";
import queryDb from "@/scripts/Database";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=600, stale-while-revalidate"
  );
  try {
    const result = await queryDb(
      "SELECT Repository, Clicks FROM ExtensionClicks"
    );
    const rows = result.rows;
    const clickCounts: { [repo: string]: number } = {};
    for (const obj of rows) {
      clickCounts[obj["repository"]] = obj["clicks"];
    }
    return response.status(200).json(clickCounts);
  } catch (error) {
    return response.status(500).json({ error });
  }
}
