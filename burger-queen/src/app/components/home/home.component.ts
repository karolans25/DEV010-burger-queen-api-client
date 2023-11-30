// import { Component } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/cdk/stepper';
import {Component} from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DataService } from 'src/app/services/data/data.service';
import { ProductInformation } from 'src/app/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  
  categories!: Set<string>;
  products!: ProductInformation[];

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  constructor(
    private _formBuilder: FormBuilder,
    // breakpointObserver: ReportingObserver,
    breakpointObserver: BreakpointObserver,
    private data: DataService
  ) {
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    this.data.getAllProducts().subscribe(res => {
      console.log(res);
      this.products = res as ProductInformation[];
      const cats = this.products.map(item => {
        console.log(item.image);
        item.image = `url('${item.image}')`;
        console.log(item.image);
        return item.type;
      });
      this.categories = new Set(cats);
      console.log(this.categories);
    });
  }
}
