import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx'; //for bluetooth serial
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit} from '@ionic-native/local-notifications/ngx';
// import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform} from "@ionic/angular";
// import { BackgroundMode } from '@ionic-native/background-mode/ngx';
// declare var sms: any;//SMS plugin
// import { SMS } from '@ionic-native/sms/ngx';
// import { Observable } from 'rxjs/Observable';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

constructor(private bluetoothSerial: BluetoothSerial,
            private androidPermissions: AndroidPermissions,
            private router: Router,
            private nativeStorage: NativeStorage,
            private localNotifications: LocalNotifications,
            public bluetoothle: BluetoothLE,
            public plt: Platform)
            {}

    ngOnInit() {
          console.log("ionViewDidLoad on HOME PAGE");
          // this.nativeStorage.remove('username').then((data) => {
          //     //
          //     this.nativeStorage.remove('number').then((num) => {
          //         //
          //         this.nativeStorage.remove('cpusername').then((cpuname) => {
          //             //
          //             this.nativeStorage.remove('cpnumber').then((cpnum) => {
          //                 //
          //             }).catch((err) => {
          //                 alert(JSON.stringify(err));
          //             })
          //         }).catch((err) => {
          //             alert(JSON.stringify(err));
          //         });
          //     }).catch((err) => {
          //         alert(JSON.stringify(err));
          //     });
          // }).catch((err) => {
          //     alert(err);
          // });
          // this.bluetoothSerial.isEnabled().then((success) => {
          //     this.confirmUser();
          // }).catch((flse) => {
          //     this.router.navigate(['/home'])
          // });
          // this.confirmUser();
          this.nativeStorage.clear();

      }

      confirmUser() {
          if(this.nativeStorage.keys() == null) {
              this.router.navigate(['/register'])
          } else {
              this.router.navigate(['/main'])
              console.log('Success' + this.nativeStorage.keys());
          }
      }
      getNotif() {
          this.localNotifications.schedule({
            id: 1,
            title: 'Bluetooth device disconnected!',
            text: 'Is your wallet safe?',
            sound: 'file://assets/sounds/ring.wav',
            attachments: ['file://assets/imgs/logo.png'],
            actions: [
                { id: 'yes', title: 'Yes' },
                { id: 'no',  title: 'No' },
                { id: 'disable',  title: 'Disable' }
            ]
          });
          // this.playAudio();
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
            //SERIAL
            this.bluetoothSerial.connect('00:18:E4:34:C7:64').subscribe((success) => {
                 this.router.navigate(['/register'])
            }, (error) => {
              this.bluetoothle.disable();
            });
                // this.router.navigate(['/register'])
            // } else {
            //     this.router.navigate(['/main'])
            //     console.log('Success' + this.nativeStorage.keys());
            //     // this.nativeStorage.keys().then((data) => {
            //     //     console.log(data);
            //     // });
            // }
        }).catch((err) => {
            alert(JSON.stringify(err) + 'enable');
        })
    }
}
