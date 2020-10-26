import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private subject = new Subject<any>();

  sendBreadCrumb(breadcrumb: string[]) {
    this.subject.next({ breadcrumb });
  }

  getBreadCrumb(): Observable<any> {
    return this.subject.asObservable();
  }

  clearBreadCrumb() {
    this.subject.next();
  }
}
