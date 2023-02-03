import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Siminformation } from '../models/interface/siminformation.model';
import { Mobilecountrycode } from '../models/interface/mobilecountrycode.model';
import { simInformationUrl, mobileCountryCodesUrl } from '../shared/common/baseurls'

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
    return this.http.post<Siminformation[]>(simInformationUrl, data);
  }
  putSimInfo(data: Siminformation, id: number) {
    return this.http.put<Siminformation[]>(simInformationUrl + id, data);
  }
  deleteSimInfo(id: number) {
    return this.http.delete<Siminformation[]>(simInformationUrl + id);
  }
  getMobileCountryCodes(): Observable<Mobilecountrycode[]> {
    return this.http.get<Mobilecountrycode[]>(mobileCountryCodesUrl);
  }
  postMobileCountryCode(data: Mobilecountrycode) {
    return this.http.post<Mobilecountrycode[]>(mobileCountryCodesUrl, data);
  }
  putMobileCountryCode(data: Mobilecountrycode, id: number) {
    return this.http.put<Mobilecountrycode[]>(mobileCountryCodesUrl + id, data);
  }
  deleteMobileCountryCode(id: number) {
    return this.http.delete<Mobilecountrycode[]>(mobileCountryCodesUrl + id);
  }
}
