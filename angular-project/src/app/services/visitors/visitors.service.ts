import {VisitorModel} from '../../models/visitor.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LocalStorageService} from 'ngx-localstorage';
import {API_URL} from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {

  constructor(private storageService: LocalStorageService, private http: HttpClient) {
  }

  /**
   * Get a list of visitors.
   * @returns A Promise that resolves to 'VisitorModel[]' when the request is succeeds or fail.
   */
  getVisitors(): Promise<VisitorModel[]> {
      return new Promise((resolve, reject) => {
        this.http.get(`${ API_URL }visitors`)
          .subscribe((visitors: {data: VisitorModel[]}) => {
            resolve(visitors.data);
          }, (error: HttpErrorResponse) => {
            console.error(error);
            reject(`Unable to check in. (Cod.: ${error.status})`);
          });
      });
  }

  /**
   * Get a list of visitors in visit.
   * @returns A Promise that resolves to 'VisitorModel[]' when the request is succeeds or fail.
   */
  getVisitorsInVisit(): Promise<VisitorModel[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${ API_URL }checklist/in-visit`)
        .subscribe((visitors: {data: any[]}) => {
          resolve(visitors.data);
        }, (error: HttpErrorResponse) => {
          console.error(error);
          reject(`Unable to check in. (Cod.: ${error.status})`);
        });
    });
  }

  /**
   * Set a visitor.
   * @param visitor A visitor.
   * @returns A Promise that resolves to 'string message' when the request is succeeds,
   * or is rejected to 'string error' on error.
   */
  setVisitor(visitor: any): Promise<string> {
    return new Promise((resolve, reject) => {
      let link = `${ API_URL }visitors`;
      if (visitor.id) {
        link = `${ API_URL }/${ visitor.id }`;
      }

      this.http.post(link, visitor)
        .subscribe(() => {
          resolve('Visitor saved');
        }, (error: HttpErrorResponse) => {
          console.error(error);
          reject(`Unable to save visitor. (Cod.: ${error.status})`);
        });
    });
  }

  /**
   * Get a visitor by id.
   * @param id The id of visitor.
   * @returns A Promise that resolves to 'VisitorModel' when the request is succeeds,
   * or is rejected to 'string error' on error.
   */
  getVisitor(id: number): Promise<VisitorModel> {
    return new Promise((resolve, reject) => {

      this.getVisitors().then((visitors: VisitorModel[]) => {

        const index = visitors.findIndex(item => item.id == id);

        if (index > -1) {
          resolve(visitors[index]);
        } else {
          reject('Registration not found.');
        }

      });

    });
  }

  /**
   * Remove a visitor by id.
   * @returns A Promise that resolves to 'string message' when the request is succeeds,
   * or is rejected to 'string error' on error.
   * @param visitorId
   */
  removeVisitor(visitorId: number) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${ API_URL }/visitors/${visitorId}`)
        .subscribe(() => {
          resolve('Visitor removed');
        }, (error: HttpErrorResponse) => {
          console.error(error);
          reject(`Unable to remove visitor. (Cod.: ${error.status})`);
        });
    });
  }

  /**
   * Checkin a visitor by id.
   * @returns A Promise that resolves to 'string message' when the request is succeeds,
   * or is rejected to 'string error' on error.
   * @param visitorId, roomId
   */
  checkinVisitor(visitorId: number, roomId: number) {
      return new Promise((resolve, reject) => {
        this.http.post(`${ API_URL }checklist/checkin`, {visitor_id: visitorId, room_id: roomId})
          .subscribe(() => {
            resolve('Checkin success');
          }, (error: HttpErrorResponse) => {
            console.error(error);
            reject(`Unable to check in. (Cod.: ${error.status})`);
          });
      });
  }

  /**
   * Checkin a visitor by id.
   * @returns A Promise that resolves to 'string message' when the request is succeeds,
   * or is rejected to 'string error' on error.
   * @param visitorId, roomId
   */
  checkoutVisitor(visitorId: number) {
    return new Promise((resolve, reject) => {
      this.http.post(`${ API_URL }checklist/checkout`, {visitor_id: visitorId})
        .subscribe(() => {
          resolve('Checkout success');
        }, (error: HttpErrorResponse) => {
          console.error(error);
          reject(`Unable to check out. (Cod.: ${error.status})`);
        });
    });
  }

  /**
   * Checkin a visitor by id.
   * @returns A Promise that resolves to 'string message' when the request is succeeds,
   * or is rejected to 'string error' on error.
   * @param visitorId, roomId
   */
  checklistInVisit() {
    return new Promise((resolve, reject) => {
      this.http.get(`${ API_URL }checklist/in-visit`,)
        .subscribe(() => {
          resolve('Checkin success');
        }, (error: HttpErrorResponse) => {
          console.error(error);
          reject(`Unable to check in. (Cod.: ${error.status})`);
        });
    });
  }

}
