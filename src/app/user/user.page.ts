/**
* User Page
**/
import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx'; //for bluetooth serial

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
    username: any;
    cpusername: any;
    number: any;
    cpnumber: any;
  constructor(private nativeStorage: NativeStorage,
        private router: Router,
        private bluetoothSerial: BluetoothSerial) { }

  ngOnInit() {
      console.log("user page loaded!");
      this.nativeStorage.getItem('username').then((data) => {
          this.username = data;
          this.nativeStorage.getItem('number').then((num) => {
              this.number = num;
                console.log(num);
              this.nativeStorage.getItem('cpusername').then((cpuname) => {
                  this.cpusername = cpuname;
                  this.nativeStorage.getItem('cpnumber').then((cpnum) => {
                      this.cpnumber = cpnum;
                  }).catch((err) => {
                      alert(JSON.stringify(err));
                  })
              }).catch((err) => {
                  alert(JSON.stringify(err));
              });
          }).catch((err) => {
              alert(JSON.stringify(err));
          });
      }).catch((err) => {
          alert(err);
      });
  }
  getData() {
      this.nativeStorage.getItem('username').then((data) => {
        console.log(data);
      }).catch((err) => {
          //
      })
  }
  goBack() {
      this.router.navigate(['/main'])
  }
  editUser() {
       this.router.navigate(['/edit-user'])
  }
  deleteUser() {
      this.nativeStorage.clear();
      this.router.navigate(['/home']);
  }

}
