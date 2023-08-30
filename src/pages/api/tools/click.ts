import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const repo = request.query.repo as string;
    if (!repo) {
      return response.status(404).json({ error: "Repository is required!" });
    }
    const result =
      await sql`SELECT Repository, Clicks FROM ToolClicks WHERE Repository=${repo}`;
    if (result.rows.length === 1) {
      const row = result.rows[0];
      const newClickCount = row["clicks"] + 1;
      await sql`UPDATE ToolClicks SET Clicks=${newClickCount} WHERE Repository=${repo}`;
      const responseJson: { [repo: string]: number } = {};
      responseJson[repo] = newClickCount;
      return response.status(200).json(responseJson);
    } else {
      return response.status(404).json({ error: "Repository does not exist!" });
    }
  } catch (error) {
    return response.status(500).json({ error });
  }
}
