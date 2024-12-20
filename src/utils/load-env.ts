import * as dotenv from "dotenv";
import * as path from "path";

function getEnvFilePath(envName: string): string {
  return path.resolve(process.cwd(), envName);
}

export function loadEnv() {
  const defaultEnvPath = getEnvFilePath(".env");
  dotenv.config({ path: defaultEnvPath });

  const envFile = `.env.${process.env.NODE_ENV || "development"}`;
  const specificEnvPath = getEnvFilePath(envFile);
  dotenv.config({ path: specificEnvPath });
}
