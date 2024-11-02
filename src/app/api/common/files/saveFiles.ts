import { put } from "@vercel/blob";

interface DocumentsFiles {
  name: string;
  url: string;
}
export interface IFilesAdaptor {
  saveFiles(pathName: string, files: File[]): Promise<DocumentsFiles[]>;
}

export class SaveFilesVercel implements IFilesAdaptor {
  async saveFiles(pathName: string, files: File[]) {
    const listOfUrl: DocumentsFiles[] = [];
    for (const file of files) {
      const fileName = file.name;
      const pathNameJoin = `${pathName}/${fileName}`;
      const res = await put(pathNameJoin, file, { access: "public" });
      listOfUrl.push({ name: fileName, url: res.url });
    }
    return listOfUrl;
  }
}
