import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelinezService {

  public naissances: any;
  mariages: any = [];
  deces: any = [];

  constructor(private _http: HttpClient) { }

  // getDetailBirthById(id: number){
  //   console.log('service', this.naissances);
  //   return this.naissances;
  // }
  getDetailBirthById(id: number): Observable<any> {
  return this._http.get<any>(`assets/data/naissances.json`);
}


}
