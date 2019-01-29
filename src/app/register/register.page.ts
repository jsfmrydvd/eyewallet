import { Component, OnInit, ViewChild } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private nativeStorage: NativeStorage,
            public alertController: AlertController,
            private router: Router) { }

  ngOnInit() {
      console.log("register page loaded!")
  }
 async createAccount() {
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
      debugger;
      if(this.username.value != "" && this.number.value != "" &&
      this.cpusername.value != "" && this.cpnumber.value != "") {
          const alert = await this.alertController.create({
               header: 'Success',
               // subHeader: 'Subtitle',
               message: 'Account created.',
               buttons: ['OK']

             });
             await alert.present();
            this.router.navigate(['/main'])

      } else {
          const alert = await this.alertController.create({
               header: 'Error',
               // subHeader: 'Subtitle',
               message: 'Please fill out the empty fields.',
               buttons: ['OK']
             });
             await alert.present();
      }

  }

}
