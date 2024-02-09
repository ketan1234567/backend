import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiDataComponent } from './api-data/api-data.component';
import { CurdOperationComponent } from './curd-operation/curd-operation.component';

const routes: Routes = [

  {
   
    path:"api_data",
    component:ApiDataComponent

  },
  {
   
    path:"curd_Operation",
    component:CurdOperationComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
