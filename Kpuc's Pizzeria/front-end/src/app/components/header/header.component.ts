import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';


const EN: string = "en";
const BG: string = "bg";
const DE: string = "de";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isCollapsed = true;
  public langSelection: boolean = false;
  private subscription!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.subscription = interval(5000).subscribe(() => {
      this.langSelection = false;
    });
    const lang = localStorage.getItem('lang');

    // if (lang === null) {
    //   localStorage.setItem("lang", EN);
    // }
  }

  setLangSelection() {
    this.langSelection = !this.langSelection;
  }

  clearLocalStorage() {
    localStorage.removeItem("typeOfLogin");
    localStorage.removeItem("isLoggedIn");
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
