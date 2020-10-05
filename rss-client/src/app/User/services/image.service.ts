import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  url = `${environment.accountServiceUrlWithZuul}`;

  constructor(private httpClient: HttpClient) { }

  setImage(input) {
    if (input == null) {
      return 'https://storage.googleapis.com/indie-hackers.appspot.com/product-avatars/quick-and-simple-image-placeholders/bcohuFwnmPgIu4aM56YZudq12m02';
    } else {
      return input;
    }
  }
  uploadImage(userId, picData) {
    let update = {
      userId,
      profilePic: picData,
    };
    return this.httpClient.post(this.url + '/user/pic', update);
  }
}
