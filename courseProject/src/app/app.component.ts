import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedCh = 'recipe';

  onNavigate(ch:string){
    this.loadedCh = ch;
  }
}
