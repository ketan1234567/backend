import { DecimalPipe } from '@angular/common';
import { Component, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { OurServicesService } from '../our-services.service';


interface Country {
	name: string;
	flag: string;
	area: number;
	population: number;
}

const COUNTRIES: Country[] = [
	{
		name: 'Russia',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: 17075200,
		population: 146989754,
	},
	{
		name: 'Canada',
		flag: 'c/cf/Flag_of_Canada.svg',
		area: 9976140,
		population: 36624199,
	},
	{
		name: 'United States',
		flag: 'a/a4/Flag_of_the_United_States.svg',
		area: 9629091,
		population: 324459463,
	},
	{
		name: 'China',
		flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
		area: 9596960,
		population: 1409517397,
	},
];

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
  MainData: any[];
  filter = new FormControl('')

	constructor(pipe: DecimalPipe,private _services:OurServicesService) {
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
  
  
  

}
