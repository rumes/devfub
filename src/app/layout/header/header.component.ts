import { Component, OnInit, OnChanges, Input, 
  		trigger, state, animate, transition, 
  		style} from '@angular/core';

@Component({
  selector: 'app-header',
  animations: [
  	trigger('visibilityChanged', [
      state('true' , style({ opacity: 1, transform: 'scale(1.0)', height: '180px' })),
      state('false', style({ opacity: 0.8, height: '60px', position:'fixed', top:'0px',
    		left:'0px', right:'0px',  bottom:'0px' })),
      transition('1 => 0', animate('0ms')),
      transition('0 => 1', animate('0ms'))
  ])
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Input() isScroll : boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggle(){
    console.log('toggle')
  }
}
