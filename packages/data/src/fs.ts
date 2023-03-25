import { readFile, writeFile, mkdir } from "node:fs/promises";
import { PathLike } from "node:fs";

export const readJson = async (filePath: PathLike) => {
  return JSON.parse(await readFile(filePath, "utf-8"));
};

export const writeJson = async (filePath: PathLike, data: object) => {
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};

export const ensureDir = async (path: PathLike) => {
  await mkdir(path, { recursive: true });
};
