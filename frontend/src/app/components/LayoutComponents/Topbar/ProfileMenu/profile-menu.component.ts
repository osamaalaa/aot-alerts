import { Component } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { ProfileService } from '../../../../services/profile.service';

@Component({
  selector: 'cui-topbar-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class TopbarProfileMenuComponent {
  badgeCount: number = 7
  userName: string
  employee: string
  email: string
  phone: string
  position: string
  img_url: any
  userid: any
  spinning: any = true

  constructor(public authService: AuthService,
              private profileservice: ProfileService) {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    this.userName = userInfo.USER_NAME || 'Anonymous'
    this.employee = userInfo.EMPLOYEE_ID
    this.email = userInfo.USER_EMAIL
    this.phone = userInfo.USER_MOBILE || '-'
    this.position =  userInfo.POSITION_NAME
    this.userid = userInfo.USER_ID

    this.getUserImage()
  }

  badgeCountIncrease() {
    this.badgeCount = 0
  }

  logout() {
    this.authService.SignOut()
  }

  getUserImage() {
    this.profileservice.getUserImage(this.userid).subscribe(url => {
      console.log(url.url)
      this.img_url = url.url
      this.spinning = false
    })
  }

}
