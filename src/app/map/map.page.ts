import { Component, OnInit } from '@angular/core';
import {Map,tileLayer,marker, polyline} from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: Map;
  marker:any;
  latLong=[];

  constructor(
    private geolocation: Geolocation
  ) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.showMap();
  }

  showMap(){
    this.map = new Map('myMap').setView([37.884821,-4.7804686], 14.5);
    tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map);
  }

  getPosition(){
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((res)=>{
      return this.latLong = [
        res.coords.latitude,
        res.coords.longitude
      ]
    }).then((latlng) => {
      this.showMarker(latlng);
    });
  }

  showMarker(latLong){
    this.marker = marker(latLong);
    this.marker.addTo(this.map)
    .bindPopup('Estás aquí');
    this.map.setView(latLong, 14.5);
  }

}
