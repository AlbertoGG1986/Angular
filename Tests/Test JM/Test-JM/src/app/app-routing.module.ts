import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasaComponent } from './casa/casa.component';

const routes: Routes = [
  {path: 'casa', component: CasaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
