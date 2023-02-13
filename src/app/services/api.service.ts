import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Siminformation } from '../models/interface/siminformation.model';
import { Mobilecountrycode } from '../models/interface/mobilecountrycode.model';
import { simInformationUrl, mobileCountryCodesUrl, userRegistrationUrl, userAuthenticationUrl } from '../shared/common/baseurls'
import { User } from '../models/interface/user.model';
import { Messages } from '../models/class/messages.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getSimInfo(): Observable<Siminformation[]> {
    return this.http.get<Siminformation[]>(simInformationUrl);
  }
  postSimInfo(data: Siminformation) {
    return this.http.post<Messages>(simInformationUrl, data);
  }
  putSimInfo(data: Siminformation, id: number) {
    return this.http.put<Messages>(simInformationUrl + id, data);
  }
  deleteSimInfo(id: number) {
    return this.http.delete<Messages>(simInformationUrl + id);
  }
  getMobileCountryCodes(): Observable<Mobilecountrycode[]> {
    return this.http.get<Mobilecountrycode[]>(mobileCountryCodesUrl);
  }
  postMobileCountryCode(data: Mobilecountrycode) {
    return this.http.post<Messages>(mobileCountryCodesUrl, data);
  }
  putMobileCountryCode(data: Mobilecountrycode, id: number) {
    return this.http.put<Messages>(mobileCountryCodesUrl + id, data);
  }
  deleteMobileCountryCode(id: number) {
    return this.http.delete<Messages>(mobileCountryCodesUrl + id);
  }
  postUserRegistration(data: User) {
    return this.http.post<Messages>(userRegistrationUrl, data);
  }
  checkUserAuthentication(data: User) {
    return this.http.post<Messages>(userAuthenticationUrl, data);
  }
}
