import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PhotosComponent } from "./pages/photos/photos.component";
import { LoadingComponent } from "./pages/loading/loading.component";

const routes: Routes = [
  { path: "photos", component: PhotosComponent },
  { path: "loading", component: LoadingComponent },
  { path: "**", pathMatch: "full", redirectTo: "photos" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
