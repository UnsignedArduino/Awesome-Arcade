import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const result = await sql`SELECT Repository, Clicks FROM ExtensionClicks`;
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
