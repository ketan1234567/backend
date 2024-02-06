import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiDataComponent } from './api-data/api-data.component';

const routes: Routes = [

  {
   
    path:"api_data",
    component:ApiDataComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
