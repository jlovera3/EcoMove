import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public misaludo:string;
  constructor(private translate: TranslateService,
    private auth:AuthService) {}

  async ionViewDidEnter(){
    this.translate.get('hello')
    .subscribe(value =>{
      this.misaludo=value;
    })

    let mipalabra=await this.translate.get('close').toPromise();
  }

  public cambioIngles(){
    this.translate.use('en')
  }
  public cambioEspanol(){
    this.translate.use('es')
  }

  public logout(){
    this.auth.logout();
  }
}
