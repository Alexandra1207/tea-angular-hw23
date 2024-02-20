import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {FormControl} from "@angular/forms";
declare var $: any;


@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  inputValue = new FormControl('');
  public search$: Subject<string> = new Subject<string>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.inputValue.value !== null) {
      this.search$.next(this.inputValue.value);
      if (this.inputValue.value.trim() === '') {
        this.router.navigate(['/products']);
      } else {
        this.router.navigate(['/products'], {queryParams: {title: this.inputValue.value}});
      }
    }
  }

  reset() {
    if (this.inputValue.value !== null) {
      this.search$.next(this.inputValue.value);
      this.inputValue.reset();
    }

    this.router.navigate(['/products']);
  }

  clearSearchParams() {
    this.router.navigate([], {
      queryParams: { title: null },
      queryParamsHandling: 'merge'
    });
  }

  handleClearSearchParam() {
    this.clearSearchParams();
  }
}
