import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Siminformation } from '../models/interface/siminformation.model';
import { Mobilecountrycode } from '../models/interface/mobilecountrycode.model';
import { baseUrl,simInformation, mobileCountryCodes, userRegistration, userAuthentication, nenewToken } from '../shared/common/baseurls'
import { User } from '../models/interface/user.model';
import { Messages } from '../models/class/messages.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }
  getSimInfo(): Observable<Siminformation[]> {
    return this.http.get<Siminformation[]>(baseUrl + simInformation);
  }
  postSimInfo(data: Siminformation) {
    return this.http.post<Messages>(baseUrl + simInformation, data);
  }
  putSimInfo(data: Siminformation, id: number) {
    return this.http.put<Messages>(baseUrl + simInformation + id, data);
  }
  deleteSimInfo(id: number) {
    return this.http.delete<Messages>(baseUrl + simInformation + id);
  }
  getMobileCountryCodes(): Observable<Mobilecountrycode[]> {
    return this.http.get<Mobilecountrycode[]>(baseUrl + mobileCountryCodes);
  }
  postMobileCountryCode(data: Mobilecountrycode) {
    return this.http.post<Messages>(baseUrl + mobileCountryCodes, data);
  }
  putMobileCountryCode(data: Mobilecountrycode, id: number) {
    return this.http.put<Messages>(baseUrl + mobileCountryCodes + id, data);
  }
  deleteMobileCountryCode(id: number) {
    return this.http.delete<Messages>(baseUrl + mobileCountryCodes + id);
  }
  postUserRegistration(data: User) {
    return this.http.post<Messages>(baseUrl + userRegistration, data);
  }
  checkUserAuthentication(data: User) {
    return this.http.post<Messages>(baseUrl + userAuthentication, data);
  }
  renewToken(data: Messages) {
    return this.http.post<any>(baseUrl + nenewToken, data);
  }
}
