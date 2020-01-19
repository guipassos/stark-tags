import {VisitorModel} from '../../models/visitor.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LocalStorageService} from 'ngx-localstorage';

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
        this.http.get('http://stark-tags.loc/api/visitors')
          .subscribe((visitors: VisitorModel[]) => {
            resolve(visitors);
          }, (error: HttpErrorResponse) => {
            console.error(error);
            reject('Unable to check in. (Cod.: ${error.status})');
          });
      });
  }

  /**
   * Set a list of visitors.
   * @param visitors A array of visitors.
   * @returns A Promise that resolves to 'string message' when the request is succeeds,
   * or is rejected to 'string error' on error.
   */
  setVisitors(visitors: VisitorModel[]) {
    return new Promise((resolve, reject) => {

      this.storageService.asPromisable().set('visitors', JSON.stringify(visitors))
        .then((confirm: boolean) => {
          resolve(confirm ? 'Registration successfully saved!' : 'Unable to save registration.');
        })
        .catch((e) => {
          console.error(e);
          reject('Unable to save registration.');
        });

    });
  }

  /**
   * Set a visitor.
   * @param visitor A visitor.
   * @returns A Promise that resolves to 'string message' when the request is succeeds,
   * or is rejected to 'string error' on error.
   */
  setVisitor(visitor: VisitorModel): Promise<string> {
    return new Promise((resolve, reject) => {

      this.getVisitors().then((visitors: VisitorModel[]) => {

        const index = visitors.findIndex(item => item.id == visitor.id);

        if (index > -1) {
          visitors[index] = visitor;
        } else {
          visitors.push(visitor);
        }

        this.setVisitors(visitors)
          .then(() => resolve('Registration saved successfully!'))
          .catch((e: string) => {
            console.error(e);
            reject('Unable to save registration.');
          });

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
   * @param id The id of visitor.
   * @returns A Promise that resolves to 'string message' when the request is succeeds,
   * or is rejected to 'string error' on error.
   */
  removeVisitor(id: number) {
    return new Promise((resolve, reject) => {

      this.getVisitors().then((visitors: VisitorModel[]) => {

        const index = visitors.findIndex(item => item.id == id);

        if (index > -1) {
          visitors.splice(index, 1);

          this.setVisitors(visitors)
            .then(() => resolve('Registration removed successfully!'))
            .catch((e: string) => {
              console.error(e);
              reject('Unable to remove registration.');
            });

        } else {
          reject('Registration not found.');
        }

      });

    });
  }

  /**
   * Checkin a visitor by id.
   * @param id The id of visitor.
   * @returns A Promise that resolves to 'string message' when the request is succeeds,
   * or is rejected to 'string error' on error.
   */
  checkinVisitor(id: number) {
      return new Promise((resolve, reject) => {
        this.http.post('http://stark-tags.loc/api/checklist/checkin', {'visitor_id':'6','room_id':'1'})
          .subscribe((visitors: VisitorModel[]) => {
            resolve(visitors);
          }, (error: HttpErrorResponse) => {
            console.error(error);
            reject(`Unable to check in. (Cod.: ${error.status})`);
          });

      });
  }

}
