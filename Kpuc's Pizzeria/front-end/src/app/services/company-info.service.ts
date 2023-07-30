import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL_COMPANY_INFO: string = "https://localhost:3000/company_info";

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  constructor(private http: HttpClient) { }

  getCompanyInfo() {
    return this.http.get(API_URL_COMPANY_INFO);
  }

  updateCompanyInfo(companyId: any, newInfo: any) {
    const url = API_URL_COMPANY_INFO + "/" + companyId;
    return this.http.put(url, newInfo);
  }
}
