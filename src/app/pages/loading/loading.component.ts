import { Component, OnInit } from "@angular/core";
import { FirestorageService } from "src/app/services/firestorage.service";
import { FilesModel } from "src/app/models/files.model";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styles: []
})
export class LoadingComponent implements OnInit {
  files: FilesModel[] = [];
  isOverElement = false;
  constructor(private _firestorage: FirestorageService) {}

  ngOnInit(): void {}

  loadImages() {
    this._firestorage.loadImages(this.files);
  }

  cleanAll() {
    this.files = [];
  }

  // testOverElement(event) {
  //   console.log(event);
  // }
}
