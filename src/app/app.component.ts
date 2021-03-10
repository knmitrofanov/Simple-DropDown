import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dropdownItems: string[] = ['Pizza', 'Beer', 'Hamburger', 'Sandwich', 'Ice cream', 'Cake', 'Coca cola', 'Vodka', 'Chocolate', 'Juice'];

  onAddItem(item: string): void {
    this.dropdownItems.unshift(item);
    this.dropdownItems.pop();
  }
}
