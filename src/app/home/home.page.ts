/**
* Home Page
**/
import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx'; //for bluetooth serial
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit} from '@ionic-native/local-notifications/ngx';
import { Platform, AlertController} from "@ionic/angular";
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

//
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
            public plt: Platform,
            public alertController: AlertController)
            {}

    ngOnInit() {
            //test if the page loaded
          console.log("ionViewDidLoad on HOME PAGE");
          this.plt.ready().then((rdy) => {

              //check if the bluetooth is already enabled
              this.bluetoothSerial.isConnected().then((success)=> {
                this.confirmUser();
              }).catch((err) => {
                  // alert(err);
              })
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
    // local notification
    getNotif() {
      this.localNotifications.schedule({
        id: 1,
        title: 'Bluetooth device disconnected!',
        text: 'Is your wallet safe?',
        actions: [
            { id: 'yes', title: 'Yes' },
            { id: 'no',  title: 'No' },
            { id: 'disable',  title: 'Disable' }
        ]
      });
    }
    gotoMain() {
        //clear the whole storage
        this.nativeStorage.clear();
    }
    // connect to the bluetooth function
    connectToBL() {
        this.bluetoothSerial.enable().then(() => {
        //------------------------------
            this.bluetoothSerial.connect('00:18:E4:34:C7:64').subscribe((success) => {
                    this.router.navigate(['/register'])
            }, (error) => {
              this.bluetoothle.disable();
            });
        //------------------------------
            // this.bluetoothSerial.connect('F8:59:71:A1:E3:EC').subscribe((success) => {
            //     this.confirmUser();
            // }, (error) => {
            //   this.bluetoothle.disable();
            // });
        }).catch((err) => {
            alert(JSON.stringify(err) + 'enable');
        })
    }
    //a function to get all paired devices
    getAllConnected() {
        // this.bluetoothSerial.list().then((devices) => {
        //     devices.forEach((device) => {
        //         alert(device.id + device.name);
        //     });
        // });
    }
}
