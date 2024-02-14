import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Router, NavigationStart } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {
  private observable: Observable<string>;

  constructor(private router: Router) {
    this.observable = new Observable<string>((observer) => {
      setTimeout(() => {
        observer.next();
      }, 10000)
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.hidePopup();
      }
    });
  }

  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.observable.subscribe(() => {
      this.showPopup();
    });
    $("#accordion").accordion({
      collapsible: true,
      heightStyle: "content",
      icons: false,
    });
  }


  showPopup(): void {
    $('#popup').modal('show');
  }

  hidePopup(): void {
    $('#popup').modal('hide');
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}


