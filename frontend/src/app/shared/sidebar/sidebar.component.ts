import {Component, AfterViewInit, OnInit} from '@angular/core';
import {ROUTES, ROUTES_AUTH} from './menu-items';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  name = localStorage.getItem('user_name') === null ? 'Guest' : localStorage.getItem('user_name');
  token = localStorage.getItem('user_token');
  public sidebarnavItems: any[];


  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService) {
    translate.addLangs(['us', 'fr']);
    translate.setDefaultLang(localStorage.getItem('selected_lang'));
  }

  // End open close
  ngOnInit() {
    if (this.token === null)
      this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    else
      this.sidebarnavItems = ROUTES_AUTH.filter(sidebarnavItem => sidebarnavItem);
  }
}
