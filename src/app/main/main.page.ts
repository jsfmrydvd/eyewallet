import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Platform, AlertController} from "@ionic/angular";
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit} from '@ionic-native/local-notifications/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx'; //for bluetooth serial
import { NativeStorage } from '@ionic-native/native-storage/ngx';
declare var sms: any;//SMS plugin


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    notificationAlreadyReceived = false;
    task: any;
    player: any;
  constructor(private geolocation: Geolocation,
            private router: Router,
            private nativeStorage: NativeStorage,
            private localNotifications: LocalNotifications,
            private nativeAudio: NativeAudio,
            private plt: Platform,
            public alertController: AlertController,
            private backgroundMode: BackgroundMode,
            private bluetoothSerial: BluetoothSerial,
            private androidPermissions: AndroidPermissions) { }

  ngOnInit() {
      console.log("main page loaded!");
      if(this.nativeStorage.keys() == null) {
          this.router.navigate(['/register']);
      } else {
          this.router.navigate(['/main']);
      }
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
  // getLocation() {
  //     this.geolocation.getCurrentPosition().then((resp) => {
  // // resp.coords.latitude
  // // resp.coords.longitude
  // console.log(resp.coords.latitude + ":" + resp.coords.longitude);
  //    }).catch((error) => {
  //      console.log('Error getting location', error);
  //    });
  // }
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
  openUser() {
      this.router.navigate(['/user'])
  }
  disconnect() {
      // this.bluetoothSerial.disconnect().then((res) => {
          this.router.navigate(['/home'])
      // }).catch((err)=> {
      //     //
      // });

  }
}
