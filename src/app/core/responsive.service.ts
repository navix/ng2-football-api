import { Injectable } from "@angular/core";

@Injectable()
export class ResponsiveService {

  constructor() {
  }

  getWidth() {
    return window.innerWidth;
  }

  isTablet(): boolean {
    return this.getWidth() == 1000;
  }

  isMobile(): boolean {
    return this.getWidth() == 600;
  }

  isFull(): boolean {
    return this.getWidth() > 1000;
  }

}