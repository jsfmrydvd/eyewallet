import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx'; //for bluetooth serial
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

constructor(private bluetoothSerial: BluetoothSerial,
            private androidPermissions: AndroidPermissions,
            private router: Router,
            private nativeStorage: NativeStorage) { }
      // this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
      //       // sms.sendMessage(messageInfo, function(message) {
      //       //     alert(message);
      //       // }, function(error) {
      //       //     alert(error + 'puta');
      //       // });
      //       alert("success");
      //   }).catch(() => {
      //       alert('error');
      //   });

  ngOnInit() {
      console.log("ionViewDidLoad on HOME PAGE")

  }
    getAllMac() {
        // this.bluetoothSerial.list().then((devices) => {
        //     devices.forEach((device) => {
        //         alert(device.id + device.name);
        //     });
        // });
        this.bluetoothSerial.enable().then(() => {
            alert('bluetooth enabled!');
            // if(this.nativeStorage.keys() == null) {
            //     this.router.navigate(['/register'])
            // } else {
            //     this.router.navigate(['/main'])
            //     console.log('Success' + this.nativeStorage.keys());
            //     this.nativeStorage.keys().then((data) => {
            //         console.log(data);
            //     });
            // }
            this.router.navigate(['/register'])
        }).catch((err) => {
            alert(JSON.stringify(err));
        })
    }

}
