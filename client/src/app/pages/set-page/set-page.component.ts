import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISet } from 'src/app/Interfaces/iset.interface';

@Component({
  selector: 'app-set-page',
  templateUrl: './set-page.component.html',
  styleUrls: ['./set-page.component.scss']
})
export class SetPageComponent implements OnInit {

  set?: ISet;

  constructor(private activatedRoute: ActivatedRoute, private router: Router){

  }

  ngOnInit(): void {
    this.set = this.activatedRoute.snapshot.data['set'];
  }

}
