import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../../services/search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  inputValue: string = '';
  constructor(private router: Router) {
  }
  ngOnInit(): void {
  }

  onSubmit() {
    if (this.inputValue.trim() === '') {
      this.router.navigate(['/products']);
    } else {
      this.router.navigate(['/products'], { queryParams: { title: this.inputValue }});
    }
  }
}
