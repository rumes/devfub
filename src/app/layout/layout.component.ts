import { Component, OnInit, HostListener, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
	navIsFixed : boolean = true;
  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(e){
  	let number = window.pageYOffset;
  	
  	if (number > 100) {
      this.navIsFixed = false;
    } else if (!this.navIsFixed && number < 50) {
      this.navIsFixed = true;
    }
  }

}
