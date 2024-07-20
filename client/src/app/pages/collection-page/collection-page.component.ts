import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICollection } from 'src/app/Interfaces/icollection.interface';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss']
})
export class CollectionPageComponent implements OnInit {

  collection?: ICollection;

  constructor(private activatedRoute: ActivatedRoute, private router: Router ){
    
  }

  ngOnInit(): void {
    this.collection = this.activatedRoute.snapshot.data['collection']
    //console.log(this.collection);
    if(!this.collection){
      this.router.navigate(['/404'])
    }
  }

}
