import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  public isOpen : Boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  closeMenu(){
    if(window.innerWidth < 768){
      this.isOpen = false;
    }
  }
}
