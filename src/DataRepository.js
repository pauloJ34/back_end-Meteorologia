import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const dataPathDir = path.resolve(path.dirname(''), 'dados');
const dataPathFile = path.resolve(dataPathDir, 'dados.csv');
const initialData = "data,time,temperatura,umidade do ar,pluviometro,luminosidade,umidade do solo";

class DataRepository {
  static async initializeRepository() {
    await this.#createDirIfNotExists();
    await this.#createFileIfNotExists();
  }

  static async #createDirIfNotExists() {
    if (this.#directoryExists()) return;
    await fs.mkdir(dataPathDir);
  }

  static #directoryExists() {
    return existsSync(dataPathDir);
  }

  static async #createFileIfNotExists() {
    if (this.#fileExists()) return;
    await fs.writeFile(dataPathFile, initialData)
  }

  static #fileExists() {
    return existsSync(dataPathFile);
  }

  static async getRawData() {
    const rawData = await fs.readFile(dataPathFile, { encoding: 'utf-8' });
    return rawData;
  }

  static async getData() {
    const rawData = await this.getRawData();
    const data = rawData.split('\r\n');

    return data;
  }

  static async pushData(data) {
    await fs.appendFile(dataPathFile, data);
  }
}

export { DataRepository }