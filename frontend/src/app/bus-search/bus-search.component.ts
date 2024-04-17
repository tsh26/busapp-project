import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DialogService} from '../shared/_modal/dialog.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from '../../environments/environment';
import {zoom} from "d3";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-bus-search',
  templateUrl: './bus-search.component.html',
  styleUrls: ['./bus-search.component.css']
})
export class BusSearchComponent implements OnInit {
  busStopCode: number;
  buses: any[] = [];
  buseStop: any[] = [];
  bookmarks: any[] = [];
  dummyData: any = [
    {
      "ServiceNo": "15",
      "Operator": "GAS",
      "NextBus": {
        "OriginCode": "77009",
        "DestinationCode": "77009",
        "EstimatedArrival": "2024-04-12T22:37:20+08:00",
        "Latitude": "1.3149151666666667",
        "Longitude": "103.909265",
        "VisitNumber": "1",
        "Load": "SEA",
        "Feature": "WAB",
        "Type": "SD"
      },
      "NextBus2": {
        "OriginCode": "77009",
        "DestinationCode": "77009",
        "EstimatedArrival": "2024-04-12T23:00:34+08:00",
        "Latitude": "1.3447948333333333",
        "Longitude": "103.94010033333333",
        "VisitNumber": "1",
        "Load": "SEA",
        "Feature": "WAB",
        "Type": "SD"
      },
      "NextBus3": {
        "OriginCode": "77009",
        "DestinationCode": "77009",
        "EstimatedArrival": "2024-04-12T23:15:29+08:00",
        "Latitude": "1.3727896666666668",
        "Longitude": "103.946175",
        "VisitNumber": "1",
        "Load": "SEA",
        "Feature": "WAB",
        "Type": "SD"
      }
    },
    {
      "ServiceNo": "150",
      "Operator": "SBST",
      "NextBus": {
        "OriginCode": "82009",
        "DestinationCode": "82009",
        "EstimatedArrival": "2024-04-12T22:51:38+08:00",
        "Latitude": "0.0",
        "Longitude": "0.0",
        "VisitNumber": "1",
        "Load": "SEA",
        "Feature": "WAB",
        "Type": "SD"
      },
      "NextBus2": {
        "OriginCode": "82009",
        "DestinationCode": "82009",
        "EstimatedArrival": "2024-04-12T23:15:38+08:00",
        "Latitude": "0.0",
        "Longitude": "0.0",
        "VisitNumber": "1",
        "Load": "SEA",
        "Feature": "WAB",
        "Type": "SD"
      },
      "NextBus3": {
        "OriginCode": "",
        "DestinationCode": "",
        "EstimatedArrival": "",
        "Latitude": "",
        "Longitude": "",
        "VisitNumber": "",
        "Load": "",
        "Feature": "",
        "Type": ""
      }
    },
    {
      "ServiceNo": "155",
      "Operator": "SBST",
      "NextBus": {
        "OriginCode": "52009",
        "DestinationCode": "84009",
        "EstimatedArrival": "2024-04-12T22:40:01+08:00",
        "Latitude": "1.3192295",
        "Longitude": "103.90477283333334",
        "VisitNumber": "1",
        "Load": "SDA",
        "Feature": "WAB",
        "Type": "SD"
      },
      "NextBus2": {
        "OriginCode": "52009",
        "DestinationCode": "84009",
        "EstimatedArrival": "2024-04-12T23:00:57+08:00",
        "Latitude": "1.3289633333333333",
        "Longitude": "103.88689266666667",
        "VisitNumber": "1",
        "Load": "SEA",
        "Feature": "WAB",
        "Type": "SD"
      },
      "NextBus3": {
        "OriginCode": "52009",
        "DestinationCode": "84009",
        "EstimatedArrival": "2024-04-12T23:13:50+08:00",
        "Latitude": "1.3441363333333334",
        "Longitude": "103.86361666666667",
        "VisitNumber": "1",
        "Load": "SEA",
        "Feature": "WAB",
        "Type": "SD"
      }
    }
  ];
  groupedBuses: any = {};
  modalRef: NgbModalRef;
  lon: any;
  lat: any;
  userId: any;

  constructor(private httpClient: HttpClient,
              private dialogService: DialogService,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getBookMarks();
    this.getBusStop();
    this.userId = localStorage.getItem('user_id');
  }

  searchBus() {
    const apiUrl = 'http://localhost:8080/api/bus/bus-arrival';
    const queryParams = this.buildQueryParams();
    console.log(queryParams);
    this.buses = [];
    this.httpClient.get<any[]>(`${apiUrl}?${queryParams}`).subscribe(
      (response) => {
        // @ts-ignore
        this.buses = response.Services;
        // @ts-ignore
        if (this.buses.length == 0) {
          this.buses = this.dummyData;
        }
        console.log(this.buses);
        this.groupBusesByServiceNo();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getBusStop() {
    const apiUrl = 'http://localhost:8080/api/bus/bus-stops';
    const queryParams = this.buildQueryParams();
    console.log(queryParams);
    this.buseStop = [];
    this.httpClient.get<any[]>(`${apiUrl}?${queryParams}`).subscribe(
      (response) => {
        // @ts-ignore
        this.buseStop = response.value;
        //console.log(this.buseStop);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getBusStopDetails(busStopCode: any) {
    console.log("Input busStopCode:", busStopCode);
    console.log("this.buseStop array:", this.buseStop);

    // Find the bus stop object that matches the provided BusStopCode
    const busStop = this.buseStop.find((busStop) => {
      console.log("Comparing BusStopCode:", busStop.BusStopCode);
      return busStop.BusStopCode == busStopCode;
    });

    console.log("Found busStop:", busStop);

    if (busStop) {
      // Return an object with RoadName and Description if the bus stop is found
      return {
        RoadName: busStop.RoadName,
        Description: busStop.Description
      };
    } else {
      // Return null or an empty object if the bus stop is not found
      return null;
    }
  }



  groupBusesByServiceNo() {
    this.groupedBuses = [];
    // Group the buses by ServiceNo
    this.buses.forEach((bus) => {
      const serviceNo = bus.ServiceNo;
      if (!this.groupedBuses[serviceNo]) {
        this.groupedBuses[serviceNo] = [];
      }

      // Restructure next buses into an array
      const nextBuses = [];

      // Iterate through each property of the bus
      for (const key in bus) {
        // Check if the property starts with "NextBus"
        if (key.startsWith("NextBus")) {
          const nextBus = bus[key];
          // Add the nextBus to the array if it is defined
          if (nextBus) {
            nextBuses.push(nextBus);
          }
        }
      }

      // Add the nextBuses array to the grouped buses
      this.groupedBuses[serviceNo].push({...bus, nextBuses});
    });
  }

  convertLoad(load: string): string {
    switch (load) {
      case 'SEA':
        return 'Seats Available'
      case 'SDA':
        return 'Standing Available'
      case 'LSD':
        return 'Limited Standing'
    }
  }

  getTypeImage(type: string): string {
    switch (type) {
      case 'SD':
        return 'assets/images/bus/SD.png'
      case 'DD':
        return 'assets/images/bus/DD-sideview.png'
      case 'BD':
        return ''
    }
  }

  getFeatureImage(type: string): string {
    switch (type) {
      case 'WAB':
        return 'assets/images/bus/WAB.png'
      case '':
        return ''
    }
  }

  convertFeatures(load: string): string {
    switch (load) {
      case 'WAB':
        return 'Available'
      case '':
        return 'Not Available'
    }
  }

  convertType(type: string): string {
    switch (type) {
      case 'SD':
        return 'Single Deck'
      case 'DD':
        return 'Double Deck'
      case 'BD':
        return 'Bendy'
    }
  }

  calculateMinutesToArrival(estimatedArrival: string): number {
    const currentTime = new Date(); // Current time
    const arrivalTime = new Date(estimatedArrival); // Convert estimated arrival time to a Date object

    // Calculate the difference in milliseconds and convert to minutes
    const timeDifference = arrivalTime.getTime() - currentTime.getTime();
    const minutesToArrival = Math.ceil(timeDifference / (1000 * 60));

    // Return the difference in minutes
    return minutesToArrival;
  }

  private buildQueryParams(): string {
    const params = [];

    if (this.busStopCode) {
      params.push(`busStopCode=${this.busStopCode}`);
    }

    return params.join('&');
  }

  openModal(content: any, lon: any, lat: any) {
    this.lat = parseFloat(lat);
    this.lon = parseFloat(lon);
    console.log( this.lon+''+this.lat);
    setTimeout(()=>{
      this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
    }, 1000)

  }


  addBookMark(code: any) {
    this.spinner.show();
    const userId = localStorage.getItem('user_id');

    if (userId) {
      const bookmarkRequest = {
        'id': Date.now(),
        'name': code,
        'userId': userId,
      };

      this.httpClient.post<any>('http://localhost:8080/api/bookmarks', bookmarkRequest).subscribe(
        (response) => {
          this.spinner.hide();
          console.log('Bookmark Added Successfully:', response);
          this.dialogService.open('Bookmark Added Successfully:', environment.info_message, 'success', environment.info);
          this.getBookMarks();
        },
        (error) => {
          this.spinner.hide();
          console.error('Error booking room:', error);
          this.dialogService.open('Bookmark Add Failed', environment.error_message, 'danger', environment.error);
        }
      );
    } else {
      // Handle the case where userId is not available in localStorage
      console.error('User ID not found in localStorage');
    }
  }

  getBookMarks() {
    const userId = localStorage.getItem('user_id');
    this.bookmarks = [];
    this.httpClient.get<any[]>('http://localhost:8080/api/bookmarks/user/' + userId).subscribe(
      (response) => {
        this.bookmarks = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  deleteBookMark(bookMarkId: any) {
    const userId = localStorage.getItem('user_id');
    this.bookmarks = [];
    this.httpClient.delete<any[]>('http://localhost:8080/api/bookmarks/' + userId + '/' + bookMarkId).subscribe(
      (response) => {
        this.dialogService.open('Bookmark Deleted Successfully:', environment.info_message, 'success', environment.info);
        this.getBookMarks();
      },
      (error) => {
        this.dialogService.open('Bookmark Delete Failed', environment.error_message, 'danger', environment.error);
      }
    );
  }


  protected readonly zoom = zoom;

  setBookMark(name) {
    this.busStopCode = name;
  }
}
