import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DialogService} from '../shared/_modal/dialog.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from "@ngrx/store";
import {SongRequest} from "../models/song-request.model";
import {submitSongRequest} from "../actions/song-request.actions.actions";
import {selectSongRequestError, selectSongRequests} from "../selectors/song-request.selectors.selectors";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-bus-ride-tune',
  templateUrl: './bus-ride-tune.component.html',
  styleUrls: ['./bus-ride-tune.component.css']
})
export class BusRideTuneComponent implements OnInit, OnDestroy {
  logged_user_id = null;
  songRequest: SongRequest = {
    userId: "",
    songName: '',
    artist: '',
    album: ''
  };

  requests$: Observable<SongRequest[]>;
  error$: Observable<any>;
  requestsSubscription: Subscription | undefined;

  constructor(private http: HttpClient,
              private dialogService: DialogService,
              private spinner: NgxSpinnerService,
              private store: Store,
              private cdr: ChangeDetectorRef) {
    this.logged_user_id = localStorage.getItem('user_id');
    this.requests$ = this.store.select(selectSongRequests);
    this.error$ = this.store.select(selectSongRequestError);
  }

  ngOnInit(): void {
    this.requestsSubscription = this.requests$.subscribe(requests => {
      console.log('selectSongRequests:', requests);
      this.cdr.detectChanges();
      // You can handle the list of requests here, for example, displaying them in the UI
    });

    this.error$.subscribe(error => {
      console.log('Error:', error);
      this.cdr.detectChanges();
      // Handle error appropriately (e.g., display an error message)
    });
  }

  ngOnDestroy(): void {
    if (this.requestsSubscription) {
      this.requestsSubscription.unsubscribe();
    }
  }



  onSubmit(): void {
    this.songRequest.userId = this.logged_user_id;
    this.store.dispatch(submitSongRequest({request: this.songRequest}));
    // Optionally, clear the form after submission
    this.songRequest = {userId: '', songName: '', artist: '', album: ''};
  }

}
