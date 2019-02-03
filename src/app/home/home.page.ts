import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx'; //for bluetooth serial
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit} from '@ionic-native/local-notifications/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform, AlertController} from "@ionic/angular";
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
declare var sms: any;//SMS plugin
// import { SMS } from '@ionic-native/sms/ngx';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
notificationAlreadyReceived = false;
task: any;
player: any;
constructor(private bluetoothSerial: BluetoothSerial,
            private androidPermissions: AndroidPermissions,
            private router: Router,
            private nativeStorage: NativeStorage,
            private localNotifications: LocalNotifications,
            private nativeAudio: NativeAudio,
            private plt: Platform,
            public alertController: AlertController,
            private backgroundMode: BackgroundMode)
            {}

    ngOnInit() {
          console.log("ionViewDidLoad on HOME PAGE");
          //when the app is opened
          this.plt.ready().then((rdy) => {
              this.backgroundMode.on('activate').subscribe(() => {
                  //task loop interval of 3 secs
                  this.backgroundMode.disableWebViewOptimizations();
                  this.task = setInterval(() => {
                      this.reInterval();
                  }, 3000);
              })
              //if the user clicked yes
              this.localNotifications.on('yes').subscribe(notification => {
                  //it will automatically send a text message
                 this.sendTxt(); // send text when the user clicked 'yes'
                 //the interval will be cleared
                 //it wont make an interval anymore the app needs to reconnect or reopen.
                 clearInterval(this.task);
                 this.notificationAlreadyReceived = false;
                 this.task = setInterval(this.reInterval, 10000);
                 // this.backgroundMode.moveToForeground();
                 // this.backgroundMode.disable();
                 // setInterval(() => {task}, 10000);
              });
              //if the user clicked no
              this.localNotifications.on('no').subscribe(notification => {
                  //the interval will stop
                  // clearInterval(this.task);
                  //then the interval will reset every 10 seconds after that.
                  this.notificationAlreadyReceived = false;
                  setInterval(() => {this.task}, 10000);
                  // this.backgroundMode.moveToBackground();
              });
              //if the user clicked disable
              this.localNotifications.on('disable').subscribe(notification => {
                  //it will permanently clear the setInterval
                  //it wont send any interval anymore
                  clearInterval(this.task);
                  this.backgroundMode.disable();
              });

               this.backgroundMode.enable();
          });
      }
    reInterval() {
        //if the bluetooth is enabled
        this.bluetoothSerial.isEnabled().then((success) => {
            //if the bluetooth is enabled it will not do anything!

            //if the bluetooth got disabled it will send a notification automatically
        }).catch((flse) => {
            //condition notificationAlreadyReceived
            if(this.notificationAlreadyReceived === false) {
                //if false it will send a notification
                this.getNotif();
            }
        });
    }
    sendTxt() {
      var messageInfo = {
        	phoneNumber: "09212562669",
        	textMessage: "This is a test message"
        };
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
            sms.sendMessage(messageInfo, function(message) {
                //
            }, function(error) {
                //
            });
        }).catch((err) => {
            alert(JSON.stringify(err));
        });
    };
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
    playAudio() {
        this.nativeAudio.preloadSimple('ringtone', 'assets/sounds/ring.wav').then((success) => {
            this.nativeAudio.play('ringtone');
        }).catch((err) => {
            alert(JSON.stringify(err));
        });
        this.player = setTimeout(() => {
            this.nativeAudio.stop('ringtone');
            this.nativeAudio.unload('ringtone');
        }, 1000 * 5);
    }
    showNotification () {
        this.localNotifications.schedule({
          text: 'Test'
        });
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
        this.playAudio();
        this.notificationAlreadyReceived = true;
    }

}
