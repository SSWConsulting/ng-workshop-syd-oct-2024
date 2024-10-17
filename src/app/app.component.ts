import { Component } from '@angular/core';
import { CompanyListComponent } from "./company/company-list/company-list.component";

@Component({
  selector: 'fbc-root',
  standalone: true,
  imports: [CompanyListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'firebootcamp-crm';
}
