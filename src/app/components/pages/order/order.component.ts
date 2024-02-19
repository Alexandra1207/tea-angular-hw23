import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {catchError, delay, of, Subscription} from "rxjs";

declare var $: any;


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {

  checkoutForm = this.fb.group({
    product: [{value: '', disabled: true}],
    name: ['', [Validators.required, Validators.pattern('^[А-Яа-я\\s]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[А-Яа-я\\s]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^(?:(?:\\+?\\d{11})|[^0-9])$')]],
    country: ['', Validators.required],
    zip: ['', [Validators.required, Validators.pattern('^\\d+$')]],
    address: ['', [Validators.required, Validators.pattern('^[а-яА-Я0-9\\s\\/\\-]+$')]],
    comment: ['']
  })

  constructor(private fb: FormBuilder, private activateRoute: ActivatedRoute, private productService: ProductService) {
  }

  private subscriptionOrder: Subscription | null = null;

  ngOnInit(): void {

    const productParam = this.activateRoute.snapshot.queryParamMap.get('product');
    this.checkoutForm.patchValue({
      product: productParam
    });
  }

  ngOnDestroy() {
    this.subscriptionOrder?.unsubscribe();
  }

  // isSubmitting: boolean = false;

  public createOrder() {
    // Object.keys(this.checkoutForm.controls).forEach(key => {
    //   const control = this.checkoutForm.get(key);
    //   if (control instanceof FormControl) {
    //     control.markAsTouched();
    //     control.markAsDirty();
    //   }
    // });
    //
    // if (this.checkoutForm.invalid) {
    //   Object.keys(this.checkoutForm.controls).forEach(key => {
    //     const control = this.checkoutForm.get(key);
    //     if (control?.invalid) {
    //       control.setErrors({'incorrect': true});
    //     }
    //   });
    //   return;
    // }

    // this.isSubmitting = true;
    this.subscriptionOrder = this.productService.createOrder({
      name: this.checkoutForm.get('name')?.value as string,
      last_name: this.checkoutForm.get('last_name')?.value as string,
      phone: this.checkoutForm.get('phone')?.value as string,
      country: this.checkoutForm.get('country')?.value as string,
      zip: this.checkoutForm.get('zip')?.value as string,
      product: this.checkoutForm.get('product')?.value as string,
      address: this.checkoutForm.get('address')?.value as string,
      comment: this.checkoutForm.get('comment')?.value as string,
    })
      .pipe(
        catchError(error => {
          console.error(error);
          return of({success: false, message: 'Что-то пошло не так'});
        }),
        // delay(1000) // свойство добавлено, чтобы было видно работу disabled для кнопки
      )
      .subscribe(response => {
        console.log(response.success);
        if (response.success && !response.message) {
          $('#order').addClass('d-none');
          $('#thanksSection').removeClass('d-none');
          this.checkoutForm.reset();
        } else {
          $('#order').addClass('d-none');
          $('#errorSection').removeClass('d-none');
          setTimeout(() => {
            $('#errorSection').addClass('d-none');
            $('#order').removeClass('d-none');
          }, 3000);
        }
        // this.isSubmitting = false;
      });
  }
}
