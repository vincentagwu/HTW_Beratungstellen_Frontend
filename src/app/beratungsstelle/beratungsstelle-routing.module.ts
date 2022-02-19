import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeratungsstellePage } from './beratungsstelle.page';

const routes: Routes = [
  {
    path: '',
    component: BeratungsstellePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
