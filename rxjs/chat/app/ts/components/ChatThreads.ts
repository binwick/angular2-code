import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import {ThreadsService} from '../services/services';
import {Observable} from 'rxjs';
import {Thread} from '../models';

@Component({
  inputs: ['thread'],
  selector: 'chat-thread',
  template: `
  <div class="media conversation">
    <div class="pull-left">
      <img class="media-object avatar" 
           src="{{thread.avatarSrc}}">
    </div>
    <div class="media-body">
      <h5 class="media-heading contact-name">{{thread.name}}
        <span *ngIf="selected">&bull;</span>
      </h5>
      <small class="message-preview">{{thread.lastMessage.text}}</small>
    </div>
    <a (click)="clicked($event)" class="div-link">Select</a>
  </div>
  `
})
export class ChatThread implements OnInit {
  thread: Thread;
  selected: boolean = false;

  constructor(private threadsService: ThreadsService) {
  }
  // 使用on init 是因为 constructor 中获取不到 thread, thread 是输入属性
  ngOnInit(): void {
    this.threadsService.currentThread
      .subscribe( (currentThread: Thread) => {
        this.selected = currentThread
          && this.thread
          && (currentThread.id === this.thread.id);
      });
  }
  // 点击事件，修改当前thread
  clicked(event: any): void {
    this.threadsService.setCurrentThread(this.thread);
    event.preventDefault();
  }
}


@Component({
  selector: 'chat-threads',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- conversations -->
    <div class="row">
      <div class="conversation-wrap">

        <chat-thread
             *ngFor="let thread of threads | async"
             [thread]="thread">
        </chat-thread>

      </div>
    </div>
  `
})
export class ChatThreads {
  threads: Observable<any>;

  constructor(private threadsService: ThreadsService) {
    this.threads = threadsService.orderedThreads;
  }
}
