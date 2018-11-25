import { Component } from '@angular/core';

import * as env from '../environments/environment';
import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PwaService]
})
export class AppComponent {
  title = env.environment.appName;

  constructor(public pwaService: PwaService) {}

}
