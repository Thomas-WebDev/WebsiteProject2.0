import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../assets/css/custom/style.css']
})
export class ProfileComponent implements OnInit {
  
  user$: Observable<User>;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.profile();
  }

  profile(): Observable<User> {
    return this.authService.profile();
  }

}
