import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = '';

  constructor(
    private userService: UsersService,
    private fileService: FilesService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.profile().subscribe();
    }
  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.userService
      .create({
        name: 'Luke',
        email: 'luke@luke.com',
        password: '123456',
        role: 'admin',
      })
      .subscribe((res) => {
        console.log(res);
      });
  }

  downloadPdf() {
    this.fileService
      .getFile(
        'my-pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file).subscribe((res) => {
        this.imgRta = res.location;
      });
    }
  }
}
