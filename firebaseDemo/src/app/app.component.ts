import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 /* follower = new Observable<any>();
  constructor(private db: AngularFireDatabase) {
   this.follower = db.object("followers/1").valueChanges();         //Gets the follower's data
  }*/


  price = new Observable<any>();

  constructor(private db: AngularFireDatabase) {
    this.price = db.object("prices/northeast/new_england").valueChanges();
  }

  ngOnInit(): void {

  }

}
