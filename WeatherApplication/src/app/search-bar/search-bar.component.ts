import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Condition } from 'selenium-webdriver';
import { preserveWhitespacesDefault } from '@angular/compiler';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private Http: HttpClient ) { }

  ngOnInit() {
  }

  city = new FormControl('');


  condition;
  hightemperature;
  lowtemperature;
  currenttemperature;
  iconcode;

  

  getColor(country) { (2)
    switch (country) {
      case 'clear sky':
        return 'purple';
      case 'USA':
        return 'blue';
      case 'HK':
        return 'red';
    }
  }


  OnSubmit(){
    let obs = this.Http.get('https://api.openweathermap.org/data/2.5/weather?q=' + this.city.value  +',CA/&APPID=e2cb39d4decf20b87b5cf2f2423b43cd');
    obs.subscribe(res => this.condition = res['weather']['0']['description']);
    obs.subscribe(res => this.hightemperature = +res['main']['temp_max'] - 275);
    obs.subscribe(res => this.lowtemperature = +res['main']['temp_min'] - 275);
    obs.subscribe(res => this.currenttemperature = +res['main']['temp'] - 275);
    obs.subscribe(res => this.iconcode = res['weather']['0']['icon'] );
    obs.subscribe(res => console.log(res));
  
    }






}

