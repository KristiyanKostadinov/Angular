import { Component, OnInit } from '@angular/core';

const ROBOT = "robot";
const WEDDING = "wedding";
const FREDRICKSON = "fredrickson";
const SHREK = "shrek";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public readonly robotKey: string = ROBOT;
  public readonly weddingKey: string = WEDDING;
  public readonly fredricksonKey: string = FREDRICKSON;
  public readonly shrekKey: string = SHREK;

  public images: { [key: string]: boolean } = {
    [ROBOT]: false,
    [WEDDING]: false,
    [FREDRICKSON]: false,
    [SHREK]: false
  }

  public selectImage(key: string): void {
    Object.keys(this.images).forEach((key: string) => {
      this.images[key] = false;
    });

    this.images[key] = true;
  }
}
