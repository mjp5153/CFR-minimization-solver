import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'game-theory-solver';
  public year;

  ngOnInit() {
    this.year = new Date().getFullYear();
  }
}
