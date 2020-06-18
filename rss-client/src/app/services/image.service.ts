import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}
  setImage(input) {
    if (input == null) {
      return 'https://storage.googleapis.com/indie-hackers.appspot.com/product-avatars/quick-and-simple-image-placeholders/bcohuFwnmPgIu4aM56YZudq12m02';
    } else {
      return input;
    }
  }
}
