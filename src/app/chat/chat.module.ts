import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {ChatRoutingModule} from './chat-routing.module';
import {FirebaseConfig, FirebaseService} from '../services';
import { ChatWindowComponent } from './chat-window/chat-window.component'



@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
  ],
  declarations: [ChatComponent, ChatWindowComponent],
  providers: [
  	FirebaseService
  ]
})
export class ChatModule { }
