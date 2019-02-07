import { Component, OnInit, ViewChild} from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
    @ViewChild('username') username;
    @ViewChild('number') number;
    @ViewChild('cpnumber') cpnumber;
    @ViewChild('cpusername') cpusername;

    uname: any;
    cpuname: any;
    numb: any;
    cpnumb: any;

  constructor(private nativeStorage: NativeStorage,
        private router: Router,
        public alertController: AlertController) { }

  ngOnInit() {
      this.nativeStorage.getItem('username').then((data) => {
          this.uname = data;
          this.nativeStorage.getItem('number').then((num) => {
              this.numb = num;
                console.log(num);
              this.nativeStorage.getItem('cpusername').then((cpun) => {
                  this.cpuname = cpun;
                  this.nativeStorage.getItem('cpnumber').then((cpnum) => {
                      this.cpnumb = cpnum;
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
  goBack() {
      this.router.navigate(['/user'])
  }
  async saveUser() {
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
       if(this.username.value != "" && this.number.value != "" &&
       this.cpusername.value != "" && this.cpnumber.value != "") {
           const alert = await this.alertController.create({
                header: 'Success',
                message: 'Details updated.',
                buttons: ['OK']

              });
              await alert.present();
              this.router.navigate(['/main'])
       } else {
           const alert = await this.alertController.create({
                header: 'Error',
                message: 'Please fill out the empty fields.',
                buttons: ['OK']
              });
              await alert.present();
       }

   }
}
