import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from '../services/authentification.service';
import {ThisReceiver} from '@angular/compiler';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent implements OnInit{

  constructor(public autService : AuthentificationService,private route:Router) {
  }

  ngOnInit(): void {
  }

  handelLogout() {
    this.autService.logout().subscribe({
      next:(data)=>{
        this.route.navigateByUrl("/login")
      }
    })
  }
}
