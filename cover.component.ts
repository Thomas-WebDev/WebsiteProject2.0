import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'home-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['../../../../assets/css/custom/style.css',
              '../../../../assets/css/custom/blocks.css'
  ]
})
export class CoverComponent implements OnInit {

  isLoggedIn: Boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

}
