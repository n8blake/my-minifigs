import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISearchResult } from 'src/app/Interfaces/isearch-result';
import { IUser } from 'src/app/Interfaces/iuser.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MinifigsService } from 'src/app/services/minifigs-services/minifigs.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  user?: IUser;
  isCurrentUser?: boolean;
  minifigureSearchResults?: ISearchResult;
  currentResultsPageNumber: number = 1;
  nextResultsPageNumber: number = 2;
  previousResultsPageNumber: number = 0;
  pageSize: number = 50;
  pages: number[] = [];
  loading: boolean = true;

  constructor(private authServcice: AuthService, private activatedRoute: ActivatedRoute, private minifigsService: MinifigsService){

  }

  ngOnInit(): void {
    const currentUser = this.authServcice.getCurrentUser();
    this.user = this.activatedRoute.snapshot.data['user'];
    if(this.user?._id && currentUser?._id){
      this.isCurrentUser = this.user._id == currentUser._id;
    }
    if(this.user){
      this.minifigsService.getMinifigsForUser(this.user._id, this.pageSize, this.currentResultsPageNumber).subscribe(results => {
        this.minifigureSearchResults = results;
        this.loading = false;
        const pages = Math.ceil(this.minifigureSearchResults.count / this.pageSize);
        //console.log(pages);
        this.pages = [...Array(pages).keys()];
      })
    }

  }

  goToPage(page: number): void {
    this.loading = true;
    if(this.user){
      this.minifigsService.getMinifigsForUser(this.user._id, this.pageSize, page).subscribe(results => {
        this.minifigureSearchResults = results;
        this.loading = false;
        this.nextResultsPageNumber = page + 1;
        this.currentResultsPageNumber = page;
        this.previousResultsPageNumber = page - 1;
      })
      
    }
  }

}
