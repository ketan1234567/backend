import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbHighlight, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ApiDataComponent } from './api-data/api-data.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CurdOperationComponent } from './curd-operation/curd-operation.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TestData } from './test-data';
import { LoginComponent } from './login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ApiDataComponent,
    HomeComponent,
    CurdOperationComponent,
    LoginComponent
  ],
  imports: [
    //InMemoryWebApiModule.forRoot(TestData),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DecimalPipe, 
    AsyncPipe,
    ReactiveFormsModule, 
    NgbHighlight,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
   InMemoryWebApiModule.forRoot(TestData, { delay: 2000, passThruUnknownUrl: true }),
   NgxPaginationModule 


    
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
