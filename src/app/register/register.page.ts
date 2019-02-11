/**
* Register Page
**/
import { Component, OnInit, ViewChild } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx'; //for bluetooth serial


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    @ViewChild('username') username; // get username from HTML
    @ViewChild('number') number; // get number from HTML
    @ViewChild('cpnumber') cpnumber; // get cpnumber from HTML
    @ViewChild('cpusername') cpusername; // get cpusername from HTML

  constructor(private nativeStorage: NativeStorage,
            public alertController: AlertController,
            private router: Router,
            private bluetoothSerial: BluetoothSerial,
            public plt: Platform) { }

  ngOnInit() {
      //check if the page loaded
      console.log("register page loaded!")
      this.plt.ready().then((rdy) => {
          //function to confirm if the user is already registered
          this.confirmUser();
      });
  }
  confirmUser() {
      this.nativeStorage.keys().then((data) => {
          if(data.toString() === "") {
              this.router.navigate(['/register']);
          } else {
              this.router.navigate(['/main'])
          }
      }).catch((err) => {
          alert(err);
      });
  }
 async createAccount() {
      //set the username to native storage
      this.nativeStorage.setItem('username', this.username.value).then(() => {
          console.log('Stored item!' + this.username.value)
      }).catch((err) => {
          // alert(JSON.stringify(err));
      });
      //set the number to native storage
      this.nativeStorage.setItem('number', this.number.value).then(() => {
          console.log('Stored item!' + this.number.value)
      }).catch((err) => {
          // alert(JSON.stringify(err));
      });
      //set the cpusername to native storage
      this.nativeStorage.setItem('cpusername',  this.cpusername.value).then(() => {
          console.log('Stored item!' + this. cpusername.value)
      }).catch((err) => {
          // alert(err);
      });
      //set the cpnumber to native storage
      this.nativeStorage.setItem('cpnumber',  this.cpnumber.value).then(() => {
          console.log('Stored item!' + this.cpnumber.value)
      }).catch((err) => {
          // alert(err);
      });
      //check if all the fields has a value
      if(this.username.value != "" && this.number.value != "" &&
      this.cpusername.value != "" && this.cpnumber.value != "") {
          const alert = await this.alertController.create({
               header: 'Success',
               message: 'Account created.',
               buttons: ['OK']

             });
             await alert.present();
             await alert.onDidDismiss().then((data) => {
                 this.router.navigate(['/main']);
             })

      } else {
          const alert = await this.alertController.create({
               header: 'Error',
               message: 'Please fill out the empty fields.',
               buttons: ['OK']
           });
             await alert.present();
      }
  }
}
