import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class PwaService {

  promptEvent: Event;

  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      if (confirm('Want to update app?')) {
        window.location.reload();
      }
    });

    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }
}
