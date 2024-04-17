import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from '@agm/core';
import {ToastrModule} from 'ngx-toastr';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {FullComponent} from './layouts/full/full.component';
import {BlankComponent} from './layouts/blank/blank.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NavigationComponent} from './shared/header-navigation/navigation.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';

import {Approutes} from './app-routing.module';
import {AppComponent} from './app.component';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};
import {MomentModule} from 'ngx-moment';
import {JwtInterceptor} from './_interceptors/jwt.interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CommonService} from './shared/common.service';
import {CommonEndPoints} from './shared/CommonEndPoints';

import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {NgxSpinnerModule} from 'ngx-spinner';
import {DataTablesModule} from 'angular-datatables';
import {DialogService} from './shared/_modal/dialog.service';
import {DialogModalComponent} from './shared/_modal/dialog-modal/dialog-modal.component';
import {BusRideTuneComponent} from './bus-ride-tune/bus-ride-tune.component';
import {BusSearchComponent} from './bus-search/bus-search.component';
import {EffectsModule} from '@ngrx/effects';
import {SongRequestEffects} from './song-request.effects.effects';
import {StoreModule} from "@ngrx/store";
import {songRequestReducer} from "./reducers/song-request.reducer.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {SongRequestService} from "./services/song-request.service";
import { TestComponentComponent } from './test-component/test-component.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    SidebarComponent,
    DialogModalComponent,
    BusRideTuneComponent,
    BusSearchComponent,
    TestComponentComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(Approutes),
    PerfectScrollbarModule,
    Ng2SearchPipeModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: ''}),
    DragDropModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en'
    }),
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    }),
    NgxSpinnerModule,
    DataTablesModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([SongRequestEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retain only last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    StoreModule.forRoot({
      songRequest: songRequestReducer,
    }),
  ],
  providers: [
    //{provide: LOCALE_ID, useValue: 'fr-FR'},
    CommonEndPoints,
    CommonService,
    DialogService,
    SongRequestService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
