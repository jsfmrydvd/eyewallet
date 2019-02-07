import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Platform, AlertController} from "@ionic/angular";
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit} from '@ionic-native/local-notifications/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
declare var sms: any;


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    notificationAlreadyReceived = false; // when disconnected
    notificationConnected = false; // when bluetooth is connected
    task: any; // interval
    player: any; // audio player
    cpnumber: any; // number of the contact person
  constructor(private geolocation: Geolocation,
            private router: Router,
            private nativeStorage: NativeStorage,
            private localNotifications: LocalNotifications,
            private nativeAudio: NativeAudio,
            private plt: Platform,
            public alertController: AlertController,
            private backgroundMode: BackgroundMode,
            private bluetoothSerial: BluetoothSerial,
            private androidPermissions: AndroidPermissions,
            public bluetoothle: BluetoothLE) { }

  ngOnInit() {
      //log if page is loaded
      console.log("main page loaded!");
      //get the contact person phone number in native storage
      this.nativeStorage.getItem('cpnumber').then((cpnum) => {
          this.cpnumber = cpnum;
      }).catch((err) => {
          alert(JSON.stringify(err));
      });
      //when the platform is ready
      this.plt.ready().then((rdy) => {
          //check if the bluetooth is already connected
          // this.bluetoothSerial.isConnected().then((success)=> {
          //     this.nativeStorage.keys().then((data) => { // once true
          //         if(data.toString() === "") {
          //             this.router.navigate(['/register']);
          //         } else {
          //             this.router.navigate(['/main']);
          //         }
          //     }).catch((err) => {
          //         alert(err);
          //     });
          // }).catch((err) => {
          //      this.router.navigate(['/home']);
          // })
          //activate of background mode
          this.backgroundMode.on('activate').subscribe(() => {
              //disabled errors regarding other plugins
              this.backgroundMode.disableWebViewOptimizations();
               //the function task() will loop every 3 seconds
              this.task = setInterval(() => {
                  this.reInterval();
              }, 3000);
          })
          //if the user clicked yes
          this.localNotifications.on('yes').subscribe(notification => {
             //it wont make an interval anymore the app needs to reconnect or reopen.
             clearInterval(this.task);
             this.notificationAlreadyReceived = false;
             this.task = setInterval(this.reInterval, 10000);
          });

          // this.bluetoothSerial.connect('F8:59:71:A1:E3:EC').subscribe((success) => {
          //     this.confirmUser();
          // }, (error) => {
          //   this.bluetoothle.disable();
          // });

          //if the user clicked no
          this.localNotifications.on('no').subscribe(notification => {
              //it will automatically send a text message
             this.sendTxt(); // send text when the user clicked 'yes'
              //the interval will stop
              this.notificationAlreadyReceived = false;
              // setInterval(() => {this.task}, 10000);
          });
          //if the user clicked disable
          this.localNotifications.on('disable').subscribe(notification => {
              //it will permanently clear the setInterval
              clearInterval(this.task);
              //it will disabled background mode
              this.backgroundMode.disable();
          });
          //enables background mode
           this.backgroundMode.enable();
      });
  }
  reInterval() {
      //if the bluetooth is enabled
      this.bluetoothSerial.isConnected().then((success) => {
          //condition notificationConnected
          if(this.notificationConnected === false) {
              //if the notification connected is still false it will sennd a notifiation
              this.showNotification();
          }
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
          phoneNumber: this.cpnumber.toString(),
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
      this.nativeAudio.loop('ringtone');
      this.player = setTimeout(() => {
          this.nativeAudio.stop('ringtone');
          this.nativeAudio.unload('ringtone');
      }, 1000 * 5);
  }

  showNotification () {
      this.localNotifications.schedule({
        title: 'Connected!'
      });
      this.notificationConnected = true;
  }
  getNotif() {
      this.localNotifications.schedule({
        id: 1,
        title: 'Bluetooth device disconnected!',
        text: 'Is your wallet safe?',
        sound: 'file://assets/sounds/ring.wav',
        actions: [
            { id: 'yes', title: 'Yes' },
            { id: 'no',  title: 'No' },
            { id: 'disable',  title: 'Disable' }
        ]
      });
      this.notificationAlreadyReceived = true;
  }
  openUser() {
      this.router.navigate(['/user'])
  }
  disconnect() {
      this.bluetoothSerial.disconnect().then((res) => {
        this.bluetoothle.disable();
        this.router.navigate(['/home'])
      }).catch((err)=> {
          //
      });
  }
}
