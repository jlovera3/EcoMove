import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Globalization } from '@ionic-native/globalization/ngx';

import { TranslateService } from '@ngx-translate/core';
//import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Mapa',
      url: '/map',
      icon: 'locate'
    },
    {
      title: 'Lista de Scooters',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Mis Viajes',
      url: '/viajes',
      icon: 'map'
    },
    {
      title: 'Perfil (No funciona)',
      url: '/profile',
      icon: 'body'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private global: Globalization,
    private translate:TranslateService,
    //private auth:AuthService,
    private router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      //Aqui vamos a detectar idioma
      this.global.getPreferredLanguage().then(v=>{
        const language=v.value.substring(0,2);
        if(language==='es'){
          this.translate.use('es');
        }else{
          this.translate.use('en');
        }
      })
      .catch(err=>this.translate.use('en'));
      console.log("Hola");
      /*await this.auth.checkSession();

      if(this.auth.isAuthenticated()){
        this.router.events.subscribe(event=>{
          if(event instanceof NavigationEnd){
            if(this.router.url==='/' 
            || this.router.url==='/login'){
              console.log("Hola1");
              this.router.navigate(['/login']);
            }
          }
        })
      }
      console.log("Hola2");*/
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
