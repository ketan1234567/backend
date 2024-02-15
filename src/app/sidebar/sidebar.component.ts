import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  MainRole:any
  UserEmail:any

  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  constructor(private _router:Router){}



  ngOnInit(): void {
    const storedData = localStorage.getItem('signUp');
 
    if (storedData) {
        try {
            // Parse the JSON string back into an object
            const parsedData = JSON.parse(storedData);

            // Use the data as needed
            this.MainRole = parsedData.role;
            this.UserEmail = parsedData.email;

            console.log('User data retrieved from localStorage:', this.MainRole);
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
        }
    } 
}

  logout() {
    // Remove item from localStorage
    localStorage.removeItem('signUp');
    
    // Check if the item was successfully removed
    if (!localStorage.getItem('signUp')) {
        console.log("Logout_Function_Working");
        
        // Reload the page to reflect logout changes
        location.reload();
        
        // Navigate to the 'login' route (optional)
        this._router.navigate(['/login']);
    } else {
        console.log("Logout_Function_Not_Working");
    }
}

}
