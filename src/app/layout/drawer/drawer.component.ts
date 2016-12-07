import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/primeng';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
	 private items: MenuItem[];
  constructor() { }

  ngOnInit() {
  	this.items = [
                    {label: 'New', icon: 'fa-plus'},
                    {label: 'Open', icon: 'fa-download'},
                    {label: 'Undo', icon: 'fa-refresh'}
                ];
  }

}
