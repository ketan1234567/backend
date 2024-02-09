import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbHighlight, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ApiDataComponent } from './api-data/api-data.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CurdOperationComponent } from './curd-operation/curd-operation.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TestData } from './test-data';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ApiDataComponent,
    HomeComponent,
    CurdOperationComponent
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
    InMemoryWebApiModule.forRoot(TestData, { delay: 1000, passThruUnknownUrl: true }),

    
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
