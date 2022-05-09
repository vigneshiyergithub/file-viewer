export class File {
  constructor(fileName, childFiles, fileType) {
    this.fileName = fileName;
    this.childFiles = childFiles;
    this.fileType = fileType;
  }

  fileName = "";
  childFiles = [];
  fileType = "";
}
