import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-search',
    imports: [AsyncPipe, FormsModule, DatePipe, RouterLink],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {


  locations$: Observable<any[]> = new Observable<any[]>
  masterSrv = inject(MasterService);
  busList: any[] = [];

  searchObj: any = {
    fromLocation:"",
    toLocation:"",
    travelDate:""
  }

  addBusSchedule() {
    const scheduleData = {
      scheduleId: 0,
      vendorId: 137,
      busName: "GANG LIFE",
      busVehicleNo: "ABC-123",
      fromLocation: 95,
      toLocation: 96,
      departureTime: "2025-02-07T16:27:27.784Z",
      arrivalTime: "2025-02-08T03:00:00.000Z",
      scheduleDate: "2025-02-07T16:27:27.784Z",
      price: 8267,
      totalSeats: 50
    };

    this.masterSrv.postBusSchedule(scheduleData).subscribe({
      next: response => {
        console.log('Bus schedule posted successfully:', response);
      },
      error: error => {
        console.error('Error posting bus schedule:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  ngOnInit(): void {
    this.getAllLocations();
    // this.addBusSchedule();

  }

  getAllLocations(){
    this.locations$ = this.masterSrv.getLocations();
  }

  onSearch(){
    const {fromLocation,toLocation,travelDate} = this.searchObj;
    this.masterSrv.searchBus(fromLocation,toLocation,travelDate).subscribe((res:any)=>{
      this.busList = res;
      console.log(res)
    })
  }


}
