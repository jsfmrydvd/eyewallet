import { Component, OnInit, ViewChild } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    @ViewChild('username') username;
    @ViewChild('number') number;
    @ViewChild('cpnumber') cpnumber;
    @ViewChild('cpusername') cpusername;

  constructor(private nativeStorage: NativeStorage) { }

  ngOnInit() {
      console.log("register page loaded!")
  }
  createAccount() {
      this.nativeStorage.setItem('username', this.username.value).then(() => {
          console.log('Stored item!' + this.username.value)
      }).catch((err) => {
          // alert(JSON.stringify(err));
      });
      this.nativeStorage.setItem('number', this.number.value).then(() => {
          console.log('Stored item!' + this.number.value)
      }).catch((err) => {
          // alert(JSON.stringify(err));
      });
      this.nativeStorage.setItem('cpusername',  this.cpusername.value).then(() => {
          console.log('Stored item!' + this. cpusername.value)
      }).catch((err) => {
          // alert(err);
      });
      this.nativeStorage.setItem('cpnumber',  this.cpnumber.value).then(() => {
          console.log('Stored item!' + this.cpnumber.value)
      }).catch((err) => {
          // alert(err);
      });
      

  }

}
