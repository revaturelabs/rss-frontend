import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheaterService {

  hidden: string;
  visibilityChange: string;

  constructor() {
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
      this.hidden = "hidden";
      this.visibilityChange = "visibilitychange";
      
      // Warn if the browser doesn't support addEventListener or the Page Visibility API
      if (typeof document.addEventListener === "undefined" || this.hidden === undefined) {
        console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
      } else {
      // Handle page visibility change
        // console.log("Add visibility change listener");
        // document.addEventListener(this.visibilityChange, this.handleVisibilityChange, false);
        this.addListeners()
      }
    }
  }

  // If the page is hidden, pause the video;
  // if the page is shown, play the video
  handleVisibilityChange(): void {
    if (document.hidden) {
      console.log("HIDING")
      alert("Tab left, quiz void");
    }
  }

  addListeners() {
    addEventListener('focus', (event) => {
      // event.preventDefault()
      console.log('some shit changed')   
    }, true);
    
    addEventListener('blur', (event) => {
      event.preventDefault()
      console.log('some shit changed')
      // alert('tf you think youre doing')
    }, true);
  }

}
