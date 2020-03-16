import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output
} from "@angular/core";
import { FilesModel } from "../models/files.model";

@Directive({
  selector: "[appNgDropFiles]"
})
export class NgDropFilesDirective {
  constructor() {}

  @Input() files: FilesModel[] = [];

  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  @HostListener("dragover", ["$event"])
  public onDragEnter(event: any) {
    this.mouseOver.emit(true);
    this._preventStop(event);
  }
  @HostListener("dragleave", ["$event"])
  public onDragLeave(event: any) {
    this.mouseOver.emit(false);
  }
  @HostListener("drop", ["$event"])
  public onDrop(event: any) {
    const transfer = this._getTranfer(event);
    if (!transfer) {
      return;
    }

    this._extractFiles(transfer.files);
    this._preventStop(event);
    this.mouseOver.emit(false);
  }

  private _getTranfer(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  private _extractFiles(fileList: FileList) {
    // console.log(fileList);
    for (const property in Object.getOwnPropertyNames(fileList)) {
      const fileTemp = fileList[property];
      if (this._fileCanBeLoaded(fileTemp)) {
        const newFile = new FilesModel(fileTemp);
        this.files.push(newFile);
      }
    }
    console.log(this.files);
  }

  //validations

  private _fileCanBeLoaded(file: File): boolean {
    if (!this._fileWasDropped(file.name) && this._isImage(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  private _preventStop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileWasDropped(filename: string): boolean {
    for (const file of this.files) {
      if (file.fileName === filename) {
        console.log("file " + filename + " was added");
        return true;
      }
    }
    return false;
  }

  private _isImage(typeOfFile: string): boolean {
    return typeOfFile === "" || typeOfFile === undefined
      ? false
      : typeOfFile.startsWith("image");
  }
}
