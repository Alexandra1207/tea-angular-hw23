import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Router, NavigationStart } from '@angular/router';
import {NgbAccordion, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {
  private observable: Observable<string>;
  @ViewChild('popup') popup!: TemplateRef<ElementRef>;
  @ViewChild('acc') accordion!: NgbAccordion;

  toggle(panelId: string) {
    this.accordion.toggle(panelId);
  }

  @ViewChild('acc')
  acc!: TemplateRef<ElementRef>

  constructor(private router: Router, private modalService: NgbModal) {
    this.observable = new Observable<string>((observer) => {
      setTimeout(() => {
        observer.next();
      }, 10000)
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.modalService.dismissAll();
      }
    });
  }

  private subscription: Subscription | null = null;

  ngOnInit(): void {

    this.subscription = this.observable.subscribe(() => {
      this.modalService.open(this.popup, {});
    });
    $("#accordion").accordion({
      collapsible: true,
      heightStyle: "content",
      icons: false,
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }
}


