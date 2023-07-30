import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

const EN: string = "en";
const BG: string = "bg";
const DE: string = "de";

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent implements OnInit {
  public isCollapsed: boolean = true;
  public langSelection: boolean = false;
  public admin: boolean = false;
  private subscription!: Subscription;
  public position: any;

  constructor() { }

  ngOnInit(): void {
    this.subscription = interval(5000).subscribe(() => {
      this.langSelection = false;
      this.admin = false;
    });

    this.position = localStorage.getItem("position");
  }

  clearLocalStorage() {
    localStorage.removeItem("typeOfLogin");
    localStorage.removeItem("isLoggedIn");
  }

  setLangSelection() {
    this.langSelection = !this.langSelection;
  }

  setAdminSelection() {
    this.admin = !this.admin;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  englishLang() {
    console.log("EN:");

    this.langSelection = false;
    localStorage.setItem("lang", EN);
    window.location.reload();
  }

  bulgarianLang() {
    console.log("BG:");
    this.langSelection = false;
    localStorage.setItem("lang", BG);
    window.location.reload();

  }

  deutschLang() {
    console.log("DE:");
    this.langSelection = false;
    localStorage.setItem("lang", DE);
    window.location.reload();

  }
}
