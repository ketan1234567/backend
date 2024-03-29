import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiDataComponent } from './api-data/api-data.component';
import { CurdOperationComponent } from './curd-operation/curd-operation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  {
   
    path:"api_data",
    component:ApiDataComponent

  },
  {
   
    path:"curd_Operation",
    component:CurdOperationComponent

  },
  {
   
    path:"home",
    component:HomeComponent,

  },
  { 
   
    path:"login",
   
    component:LoginComponent,
     // Apply the AuthGuard to this route
    

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
