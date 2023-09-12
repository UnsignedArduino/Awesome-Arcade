import { Pool, QueryConfig, QueryResult } from "pg";
import { getEnvironment } from "@/components/WithAppProps";

export default function queryDb(
  queryTextOrConfig: string | QueryConfig<any[]>,
  values?: any[] | undefined
): Promise<QueryResult<any>> {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: 5432,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getEnvironment() !== "development",
  });
  return pool.query(queryTextOrConfig, values);
}
