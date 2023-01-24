import { Component, OnInit } from '@angular/core';
import { personalDetailsModel } from 'src/app/models/userModel';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  userDetails: personalDetailsModel | undefined;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.userDetails = this.accountService.getUserValue()?.personalDetails;
  }

}
