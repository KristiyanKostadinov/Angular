import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

const EN: string = "en";
const BG: string = "bg";
const DE: string = "de";

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {
  public isCollapsed: boolean = true;
  public langSelection: boolean = false;
  private subscription!: Subscription;
  
  constructor() { }

  ngOnInit(): void {
    this.subscription = interval(5000).subscribe(() => {
      this.langSelection = false;
    });
    const lang = localStorage.getItem('lang');

    if (lang === null) {
      localStorage.setItem("lang", EN);
    }
  }

  clearLocalStorage() {
    localStorage.removeItem("typeOfLogin");
    localStorage.removeItem("isLoggedIn");
  }

  setLangSelection() {
    this.langSelection = !this.langSelection;
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
