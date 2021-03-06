import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/beratungsstelle',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./beratungsstelle/beratungsstelle.module').then( m => m.FolderPageModule)
  },
  {
    path: 'rating',
    loadChildren: () => import('./modals/rating/rating.module').then( m => m.RatingPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
