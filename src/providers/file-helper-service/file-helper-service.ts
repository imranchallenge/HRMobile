import { Injectable } from "@angular/core";
import { ActionSheetController, Platform } from "ionic-angular";
import { File } from "@ionic-native/file";
import { Camera } from "@ionic-native/camera";
/*
  Generated class for the FileHelperServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var cordova: any;

@Injectable()
export class FileHelperServiceProvider {
  constructor(
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private file: File,
    public platform: Platform
  ) {
    console.log("Hello FileHelperServiceProvider Provider");
  }
  pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  // Create a new name for the image
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  takePicture(sourceType): Promise<any> {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    // Get the data of an image
    return this.camera.getPicture(options);
  }
  // Copy the image to a local folder
  copyFileToLocalDir(namePath, currentName, newFileName): Promise<any> {
    return this.file.copyFile(
      namePath,
      currentName,
      cordova.file.dataDirectory,
      newFileName
    );
  }
}
