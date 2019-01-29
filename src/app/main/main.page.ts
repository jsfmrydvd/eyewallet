import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private geolocation: Geolocation,
            private router: Router) { }

  ngOnInit() {
      console.log("main page loaded!")
  }

  getLocation() {
      this.geolocation.getCurrentPosition().then((resp) => {
  // resp.coords.latitude
  // resp.coords.longitude
  console.log(resp.coords.latitude + ":" + resp.coords.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
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
