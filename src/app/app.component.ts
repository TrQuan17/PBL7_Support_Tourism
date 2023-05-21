import { Component, OnInit } from '@angular/core';
import { IconService } from './core/services/icon/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Support_Tourism_FE';
  public constructor(
    private icon: IconService
  ) {}

  public ngOnInit(): void {
    this.icon.init();
  }
}

