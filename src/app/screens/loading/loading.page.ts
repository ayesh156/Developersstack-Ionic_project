import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(private navController:NavController) { }

  ngOnInit() {
    setTimeout(()=>{
      this.navController.navigateForward('/login');
    }, 1000);
  }

}
