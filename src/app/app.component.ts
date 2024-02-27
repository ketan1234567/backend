import { DecimalPipe } from '@angular/common';
import { Component, HostListener, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { OurServicesService } from './our-services.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(private _services:OurServicesService){}
  ngOnInit() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    }
  }

  title = 'backend';
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    console.log("This is logout");
    
    this._services.logout();

        // Call the logout method when the page is refreshed
        window.addEventListener('beforeunload', () => {
          this._services.logout();
        });
  }

  sidebarExpanded = true;
}
