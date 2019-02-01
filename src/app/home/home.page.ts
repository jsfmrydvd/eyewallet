import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx'; //for bluetooth serial
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform, AlertController} from "@ionic/angular";
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
declare var sms: any;//SMS plugin
// import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
notificationAlreadyReceived = false;
constructor(private bluetoothSerial: BluetoothSerial,
            private androidPermissions: AndroidPermissions,
            private router: Router,
            private nativeStorage: NativeStorage,
            private localNotifications: LocalNotifications,
            private nativeAudio: NativeAudio,
            private plt: Platform,
            public alertController: AlertController,
            private backgroundMode: BackgroundMode)
            {
                // this.plt.ready().then((rdy) => {
                //     this.localNotifications.on('yes').subscribe(notification => {
                //         alert("alright");
                //           this.sendTxt();
                //         this.notificationAlreadyReceived = true;
                //     });
                //     this.localNotifications.on('click').subscribe(notification => {
                //         alert("click constructore");
                //         this.notificationAlreadyReceived = true;
                //     });
                //     this.localNotifications
                //     this.backgroundMode.on('activate').subscribe(() => {
                //       alert("activated");
                //
                //       this.bluetoothSerial.isEnabled().then((success) => {
                //          // success ? this.anotherNotification() : this.modeNotification();
                //          alert("enabled");
                //          this.anotherNotification();
                //    }).catch((err) => {
                //        alert("catchdisabled or false");
                //        if(this.notificationAlreadyReceived === true) {
                //            alert("true");
                //          this.showNotification();
                //          } else {
                //              alert("false");
                //              this.modeNotification();
                //          }
                //    });
                //     });
                //     this.backgroundMode.enable();
                // })



                // this.plt.ready().then((rdy) => {
                //     this.backgroundMode.on('activate').subscribe(() => {
                //       alert("activated");
                //       this.backgroundMode.disableWebViewOptimizations();
                //
                //     });
                //     this.backgroundMode.enable();
                //
                //
                // });
            }
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
      console.log("ionViewDidLoad on HOME PAGE");
      this.plt.ready().then((rdy) => {
          this.localNotifications.on('yes').subscribe(notification => {
              // this.bluetoothSerial.enable().then(() => {
              //     this.router.navigate(['/register'])
              //     this.showNotification();
              // }).catch((err) => {
              //     alert(JSON.stringify(err));
              // })
              this.sendTxt();
          });
      });

      // this.plt.ready().then((rdy) => {
      //     this.localNotifications.on('yes').subscribe(notification => {
      //         // this.backgroundMode.moveToForeground();
      //         alert("yes");
      //         this.showNotification();
      //         // this.sendTxt();
      //         // this.notificationAlreadyReceived = true;
      //     });
      //     this.localNotifications.on('click').subscribe(notification => {
      //         alert("click");
      //           this.showNotification();
      //         // this.notificationAlreadyReceived = true;
      //     });
      // });
  }
  sendTxt() {
      var messageInfo = {
        	phoneNumber: "09212562669",
        	textMessage: "This is a test message"
        };
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
            sms.sendMessage(messageInfo, function(message) {
                alert(message);
            }, function(error) {
                alert(error + 'puta');
            });
        }).catch((err) => {
            alert(JSON.stringify(err));
        });
  };
  success() {
      alert("enabled");
  }
  error() {
            this.getNotif();
  }
 handlePlat() {
      this.plt.ready().then((rdy) => {
          this.localNotifications.on('click');
      })
  }
     getAllMac() {
        // this.bluetoothSerial.list().then((devices) => {
        //     devices.forEach((device) => {
        //         alert(device.id + device.name);
        //     });
        // });
        // this.bluetoothSerial.enable().then(() => {
        //     alert('bluetooth enabled!');
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
        // }).catch((err) => {
        //     alert(JSON.stringify(err));
        // })
    }
    getNotification() {
        // this.localNotifications.schedule({
        //   id: 1,
        //   text: 'Single ILocalNotification',
        //   sound: 'file://assets/sounds/ring.wav',
        //   data: { secret: "test" }
        // });
        this.nativeAudio.preloadSimple('ringtone', 'assets/sounds/ring.wav').then((success) => {
            this.nativeAudio.play('ringtone');
            alert(JSON.stringify(success));
        }).catch((err) => {
            alert(JSON.stringify(err));
        });
    }
    showNotification () {
        this.localNotifications.schedule({
          text: 'There is a legendary Pokemon near you'
        });
    }
    anotherNotification() {
        this.localNotifications.schedule({
            title: 'The big survey',
            text: 'Are you a fan of RB Leipzig?',
            attachments: ['file://assets/imgs/logo.png'],
            actions: [
                { id: 'yes', title: 'Yes' },
                { id: 'no',  title: 'No' }
            ]
        });

    }
    modeNotification() {
        this.localNotifications.schedule({
              id: 10,
              title: "Bluetooth Device Disconnected",
              text: "Is your wallet safe?",
              every: 'minute',
              foreground: true,
              attachments: ['file://assets/imgs/logo.png'],
              actions: [
                  { id: 'yes', title: 'Yes' },
                  { id: 'no',  title: 'No' }
              ]
          });
          this.notificationAlreadyReceived = true;
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
              { id: 'no',  title: 'No' }
          ]
        });
        this.backgroundMode.moveToForeground();
    }

}
