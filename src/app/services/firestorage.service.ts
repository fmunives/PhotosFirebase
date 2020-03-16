import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase";
// import "firebase/firestore";
import { FilesModel } from "../models/files.model";

@Injectable({
  providedIn: "root"
})
export class FirestorageService {
  private IMAGEN_CARPET = "img";
  constructor(private db: AngularFirestore) {}

  loadImages(images: FilesModel[]) {
    // console.log(images);
    const storageRef = firebase.storage().ref();
    for (const item of images) {
      item.isLoading = true;
      if (item.progress >= 100) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask = storageRef
        .child(`${this.IMAGEN_CARPET}/${item.fileName}`)
        .put(item.file);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) =>
          (item.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        error => console.error("Error to upload: ", error),
        () => {
          console.log("Image upload correctly");
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            item.url = downloadURL;
            item.isLoading = false;
            this.saveImages({ name: item.fileName, url: item.url });
          });
          // item.url = uploadTask.snapshot.downloadURL;
          // item.isLoading = false;
          // this.saveImages({ name: item.fileName, url: item.url });
        }
      );
    }
  }

  private saveImages(imagen: { name: string; url: string }) {
    this.db.collection(`/${this.IMAGEN_CARPET}`).add(imagen);
  }
}
