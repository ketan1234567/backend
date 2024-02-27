import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OurServicesService } from '../our-services.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isLoggedIn: boolean = false;
  MainRole: string = '';
  UserEmail: string = '';

  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  constructor(private _router:Router,private _services:OurServicesService){}
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    this._services.logout();
  }

  ngOnInit() {



    const storedData = localStorage.getItem('userDetails');
    const isLoggedIn = JSON.parse(storedData);
    console.log(isLoggedIn.isLoggedIn);
    

    if (storedData && isLoggedIn.isLoggedIn===true) {
      try {
        const parsedData = JSON.parse(storedData);
        this.isLoggedIn = true; // User is considered logged in if there's data in localStorage
        this.MainRole = parsedData.role;
        this.UserEmail = parsedData.email;
        //console.log('User data retrieved from localStorage:', this.MainRole);
      } catch (error) {
        this._router.navigate(['/login'])
      //  console.error('Error parsing user data from localStorage:', error);
      }
    }


  }

  logout() {
    // Remove item from localStorage
    localStorage.removeItem('userDetails');
  
    // Check if the item was successfully removed
    if (!localStorage.getItem('userDetails')) {
   //   console.log("Logout_Function_Working");
      this.isLoggedIn = false; // Set isLoggedIn to false after logout
      Swal.fire({ text: "Successfully Logout", icon: 'success' })
      .then((result) => {
        // Navigate to the home page after successful login
        this._router.navigate(['/login']).then(() => {
          // Reload the page after navigating to the home route
          location.reload();
        });
      });
    } else {
      //console.log("Logout_Function_Not_Working");
    }
  }
  

}
