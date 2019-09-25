import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-right-header',
  templateUrl: './right-header.component.html',
  styleUrls: ['./right-header.component.scss']
})
export class RightHeaderComponent implements OnInit {

  @Input() flexMode = true;
  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    console.log('logout');
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
