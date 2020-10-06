import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


/** CheaterService:
 *  this service is here to track the user's mouse movements,
 *  as well as certain keypresses and if they switch tabs.
 *  This is designed to be combined with our 'Quiz' Component,
 *  so that if the user tries to leave the page they'll get a
 *  warning. If they continue, their quiz will be void.
 */
@Injectable({
  providedIn: 'root'
})
export class CheaterService {

  leftTab: Subject<boolean>; // A special type of observable that we can use to easily communicate with our Quiz Component.
  invalidated: Subject<boolean>; // A special type of observable that we can use to easily communicate with our Quiz Component.

  constructor() {
    this.leftTab = new Subject<boolean>();
    this.invalidated = new Subject<boolean>();
  }

  setInvalidated() {
    console.log('invalidated')
    this.invalidated.next(true)
  }

  setLeftTab() {
    this.leftTab.next(true)
  }

  mouseOut = (e) => {
    e = e ? e : window.event;
    const from = e.relatedTarget || e.toElement;
    if (!from || from.nodeName == 'HTML') {
      // the cursor has left the building
      this.leftTab.next(true);
    }
  }

  keyDown = (e) => {
    if (e.altKey){
      console.log('Stop pressing Alt!');
      this.leftTab.next(true);
    }
  }

  blur = () => {
    console.log('blur')
    this.invalidated.next(true)
  }

  beginMonitoring() {

    this.invalidated.next(false)
    this.leftTab.next(false);

    document.addEventListener('mouseout', this.mouseOut);
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('blur', this.blur);
  }

  resetValidity() {
    this.leftTab.next(false);
    this.invalidated.next(false);
    console.log('removing')
    document.removeEventListener('mouseout', this.mouseOut)
    document.removeEventListener('blur', this.blur)
    document.removeEventListener('keydown', this.keyDown)
  }

}
