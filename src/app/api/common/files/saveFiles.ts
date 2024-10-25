import { put } from "@vercel/blob";

export interface IFilesAdaptor {
  saveFiles(pathName: string, files: File[]): Promise<string[]>;
}

export class SaveFilesVercel implements IFilesAdaptor {
  async saveFiles(pathName: string, files: File[]) {
    const listOfUrl: string[] = [];
    for (const file of files) {
      const fileName = file.name;
      const pathNameJoin = `${pathName}/${fileName}`;
      const res = await put(pathNameJoin, file, { access: "public" });
      listOfUrl.push(res.url);
    }
    return listOfUrl
  }
}
