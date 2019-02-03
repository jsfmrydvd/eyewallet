import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx'; //for bluetooth serial
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
// import { LocalNotifications, ELocalNotificationTriggerUnit} from '@ionic-native/local-notifications/ngx';
// import { NativeAudio } from '@ionic-native/native-audio/ngx';
// import { Platform, AlertController} from "@ionic/angular";
// import { BackgroundMode } from '@ionic-native/background-mode/ngx';
// declare var sms: any;//SMS plugin
// import { SMS } from '@ionic-native/sms/ngx';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

constructor(private bluetoothSerial: BluetoothSerial,
            private androidPermissions: AndroidPermissions,
            private router: Router,
            private nativeStorage: NativeStorage)
            {}

    ngOnInit() {
          console.log("ionViewDidLoad on HOME PAGE");
          if(this.nativeStorage.keys() == null) {
              this.router.navigate(['/register'])
          } else {
              this.router.navigate(['/main'])
              console.log('Success' + this.nativeStorage.keys());
          }
      }
    getAllMac() {
        // this.bluetoothSerial.list().then((devices) => {
        //     devices.forEach((device) => {
        //         alert(device.id + device.name);
        //     });
        // });
        this.bluetoothSerial.enable().then(() => {
            alert('bluetooth enabled!');
            if(this.nativeStorage.keys() == null) {
                this.router.navigate(['/register'])
            } else {
                this.router.navigate(['/main'])
                console.log('Success' + this.nativeStorage.keys());
                // this.nativeStorage.keys().then((data) => {
                //     console.log(data);
                // });
            }
        }).catch((err) => {
            alert(JSON.stringify(err));
        })
    }
}
