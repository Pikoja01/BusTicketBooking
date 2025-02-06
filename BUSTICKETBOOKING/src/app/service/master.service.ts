import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiURL: string = "https://projectapi.gerasim.in/api/BusBooking/";

  constructor(private http: HttpClient) { }


  postBusSchedule(scheduleData: any): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'text/plain',
      'Content-Type': 'application/json-patch+json'
    });

    return this.http.post(this.apiURL + "PostBusSchedule", scheduleData, { headers });
  }

  getLocations():Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + "GetBusLocations")
  }

  searchBus(from: number,to: number, travelDate: string):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiURL}searchBus2?fromLocation=${from}&toLocation=${to}&travelDate=${travelDate}`)
  }

  getSchedulebyID(id:number){
    return this.http.get<any[]>(`${this.apiURL}GetBusScheduleById?id=${id}`)
  }

  getBookedSeats(id:number){
    return this.http.get<any[]>(`${this.apiURL}getBookedSeats?shceduleId=${id}`)
  }


}
