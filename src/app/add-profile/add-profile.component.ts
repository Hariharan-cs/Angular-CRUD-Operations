import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.pattern('[a-zA-Z]*')),
    lastName: new FormControl('',),
    gender: new FormControl(''),
    dob: new FormControl(''),
    age: new FormControl('', Validators.maxLength(2)),
    addressLine1: new FormControl(''),
    addressLine2: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    zip: new FormControl('', Validators.pattern('[0-9]*')),
    phonenumber: new FormControl(''),
    emailId: new FormControl('', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')),
  });

  userDetails: any = [];

  AddEditVisible:boolean = false;

  isNewUser:boolean = true;

  EditPosition = 0;

  finalStates: any = {};


  ngOnInit(): void {
    var user = localStorage.getItem('userDetails');
    if(user)
      this.userDetails = JSON.parse(user);

    this.finalStates = this.states;
  }

  
  genders = [
    { name: 'Male', value: 'M' },
    { name: 'Female', value: 'F' },
    { name: 'Transgender', value: 'T' }
  ]

  countries = [
    { name: 'Afghanistan', value: 'AF' },
    { name: 'Bangladesh', value: 'BA' },
    { name: 'Ethiopia', value: 'ET' },
    { name: 'India', value: 'IN' },
    { name: 'Saudi Arabia', value: 'SA' }
  ]

  states = [
    { name: 'One - Afghanistan', value: 'O', country: "AF" },
    { name: 'Two - Afghanistan', value: 'Tw', country: "AF" },
    { name: 'Three - Afghanistan', value: 'Th', country: "AF" },
    { name: 'Four - Afghanistan', value: 'Fo', country: "AF" },
    { name: 'Five - Afghanistan', value: 'Fi', country: "AF" },

    { name: '1One - Bangladesh', value: '1O', country: "BA" },
    { name: '1Two - Bangladesh', value: '1Tw', country: "BA" },
    { name: '1Three - Bangladesh', value: '1Th', country: "BA" },
    { name: '1Four - Bangladesh', value: '1Fo', country: "BA" },
    { name: '1Five - Bangladesh', value: '1Fi', country: "BA" },

    { name: '2One - Ethiopia', value: '2O', country: "ET" },
    { name: '2Two - Ethiopia', value: '2Tw', country: "ET" },
    { name: '2Three - Ethiopia', value: '2Th', country: "ET" },
    { name: '2Four - Ethiopia', value: '2Fo', country: "ET" },
    { name: '2Five - Ethiopia', value: '2Fi', country: "ET" },

    { name: '3One - India', value: '3O', country: "IN" },
    { name: '3Two - India', value: '3Tw', country: "IN" },
    { name: '3Three - India', value: '3Th', country: "IN" },
    { name: '3Four - India', value: '3Fo', country: "IN" },
    { name: '3Five - India', value: '3Fi', country: "IN" },

    { name: '4One - Saudi Arabia', value: '4O', country: "SA" },
    { name: '4Two - Saudi Arabia', value: '4Tw', country: "SA" },
    { name: '4Three - Saudi Arabia', value: '4Th', country: "SA" },
    { name: '4Four - Saudi Arabia', value: '4Fo', country: "SA" },
    { name: '4Five - Saudi Arabia', value: '4Fi', country: "SA" }
  ]

  saveUserDetails() {
    if(this.isNewUser){
      var len = this.userDetails.length;
      this.userDetails[len] = this.profileForm.value;
    }
    else{
      this.userDetails[this.EditPosition] = this.profileForm.value;
    }
    this.clearForm();
    this.AddEditVisible = true;
    localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
  }

  genderChange(event: any) {
  }

  countryChange(event: any) {
    var selectedCountry = event.target.value.substr(2).trim();
    this.finalStates = this.states.filter(state => state.country == selectedCountry)
  }

  stateChange(event: any) {
    var country = this.profileForm.get('country').value;
    var state = this.profileForm.get('state').value;
    if(country == ''){
      var selectedState = this.states.filter(sta => sta.value == state)
      this.profileForm.get('country').setValue(selectedState[0].country);
      this.finalStates = this.states.filter(state => state.country == selectedState[0].country)
    }
  }

  clearForm() {
    this.profileForm.reset();
  }

  Edit(position) {
    this.AddEditVisible = false;
    this.profileForm.setValue(this.userDetails[position]);
    this.isNewUser = false;
    this.EditPosition = position;
  }

  Delete(position){
    const index = this.userDetails.indexOf(this.userDetails[position]);
    if (index > -1) {
      this.userDetails.splice(index, 1);
    }
    localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
    if(this.userDetails.length == 0){
      this.AddEditVisible = false;
    }
  }


  ageCalculator(event: any) {
    let selectedDate = new Date(event.target.value), dateString;
    dateString = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`
    let birth = new Date(dateString);
    let now = new Date();
    let beforeBirth = ((() => { birth.setDate(now.getDate()); birth.setMonth(now.getMonth()); return birth.getTime() })() < birth.getTime()) ? 0 : 1;
    var age = now.getFullYear() - birth.getFullYear() - beforeBirth;
    if(age < 1){
      alert('Please Enter age greater than 1');
      this.profileForm.get('dob').reset();
    }
    else if(age > 95){
      alert('Please Enter age Less than 95');
    }
    else{
      this.profileForm.get('age').setValue(age);
    }
    
  }

  viewUsers(){
    if(this.userDetails.length > 0){
      this.AddEditVisible = true;
    }
    else{
      alert('No User Data Available');
    }
  }
  
  addUser(){
    this.AddEditVisible = false;
    this.profileForm.reset();
  }


}




  // ngAfterViewInit(){
  //   var countryUrl = `http://battuta.medunes.net/api/quota/?key=${this.apiKey}`
  //   var stateUrl = `http://battuta.medunes.net/api/quota/?key=${this.apiKey}`
  //   this.http.get('')
  // }

  // async testGet(){
  //   var url=`http://battuta.medunes.net/api/country/all/?key=${this.apiKey}`
  //   var data = await this.http.get(url);
  //   console.log('data',data);
  //   this.showConfig(url);
  // }

  // getConfig(url) {
  //   return this.http.get(url);
  // }

  // showConfig(url) {
  //   this.getConfig(url)
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }
