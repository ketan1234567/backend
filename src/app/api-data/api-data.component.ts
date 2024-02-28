import { DecimalPipe } from '@angular/common';
import { Component, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { OurServicesService } from '../our-services.service';
import { Route, Router } from '@angular/router';


interface Country {
	name: string;
	flag: string;
	area: number;
	population: number;
}

const COUNTRIES: Country[] = [];

function search(text: string, pipe: PipeTransform): Country[] {
	return COUNTRIES.filter((country) => {
		const term = text.toLowerCase();
		return (
			country.name.toLowerCase().includes(term) ||
			pipe.transform(country.area).includes(term) ||
			pipe.transform(country.population).includes(term)
		);
	});
}


@Component({
  selector: 'app-api-data',
  templateUrl: './api-data.component.html',
  styleUrl: './api-data.component.scss'
})
export class ApiDataComponent {
  LocalVariable:any
	currentPage: number = 1; // Current page number
  itemsPerPage: number = 5; // Display 5 records per page

	format: string = 'dd-MM-YYYY HH:mm:ss';
  MainData: any[];
  filter = new FormControl('')

	constructor(pipe: DecimalPipe,private _services:OurServicesService,private _router:Router) {
    this.filter.valueChanges.pipe(
      debounceTime(300), // Wait for 300ms after the user stops typing
      distinctUntilChanged() // Only emit if the filter value has changed
    ).subscribe(() => {
      this.applyFilter();
    
    });
	


	}
  ngOnInit(): void {
    this._services.GetAllDataWether().subscribe((result) => {
      console.log(result.articles);
      this.MainData = result.articles;
    });
this.userData()

  }
  
  applyFilter(): void {
    const searchText = (this.filter.value || '').toLowerCase(); // Use optional chaining to handle null/undefined
    this.MainData = this.MainData.filter((country) =>
      (country.source?.name || '').toLowerCase().includes(searchText) || // Use optional chaining to handle null/undefined
      (country.author || '').toLowerCase().includes(searchText) ||
      (country.title || '').toLowerCase().includes(searchText) ||
      (country.description || '').toLowerCase().includes(searchText) ||
      (country.publishedAt || '').toLowerCase().includes(searchText) ||
      (country.content || '').toLowerCase().includes(searchText)
    );
  }
  
  
  userData() {
    const storedData = localStorage.getItem('userDetails');
    const isLoggedIn = JSON.parse(storedData);
 //   console.log(isLoggedIn.isLoggedIn);
    
    if (storedData && isLoggedIn.isLoggedIn===true) {
      try {
        const parsedData = JSON.parse(storedData);


        this.LocalVariable = parsedData;
        console.log('User data retrieved from localStorage:',);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    } else {
      this._router.navigateByUrl('login')
      console.warn('No user data found in localStorage');
    }
  }

}
