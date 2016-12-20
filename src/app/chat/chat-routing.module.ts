import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';

const chatRoot:Routes = [

  {
    path : 'room/:id',
    component : ChatWindowComponent,
     data: {
      preload: true
    }
  },
	{
		path : '',
		component : ChatComponent,
     data: {
      preload: true
    }
	}
];

@NgModule({
  // import Roter Module and set this Router module as root router module in the app
  imports: [
    RouterModule.forChild(chatRoot)
  ],
  // export Router Module that can Inject in app.module and can use system wide
  exports: [
    RouterModule
  ]
})
export class ChatRoutingModule {} 