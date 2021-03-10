import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';

enum Key {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Enter = 'Enter'
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})

export class DropdownComponent {

  @Input() items: string[];
  @Output() addItem = new EventEmitter<string>();
  @ViewChild('dropdown') dropdown: ElementRef;

  dropdownValue: string;
  isOpen = false;
  isSelected = false;
  selectedItemIndex = -1;

  constructor() { }

  @HostListener('document:click', ['$event']) clickOut(event: Event) {
    this.isOpen = this.dropdown.nativeElement.contains(event.target);
  }

  onListItemClick(itemIndex: number): void {
    this.dropdownValue = this.items[itemIndex];
    this.selectedItemIndex = itemIndex;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === Key.ArrowDown) {
      if (this.selectedItemIndex === this.items.length - 1) {
        this.selectedItemIndex = 0;
      } else {
        this.selectedItemIndex += 1;
      }
      this.dropdownValue = this.items[this.selectedItemIndex];
    }
    if (event.key === Key.ArrowUp) {
      if (this.selectedItemIndex === -1 || !this.selectedItemIndex) {
        this.selectedItemIndex = this.items.length - 1;
      } else {
        this.selectedItemIndex -= 1;
      }
      this.dropdownValue = this.items[this.selectedItemIndex];
    }
    if (event.key !== Key.Enter || !this.dropdownValue) {
      return;
    }
    this.addItem.emit(this.dropdownValue);
    this.selectedItemIndex = 0;
  }

  onResetClick(): void {
    this.dropdownValue = null;
    this.selectedItemIndex = -1;
  }
}
