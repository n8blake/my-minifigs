import { Component, Input } from '@angular/core';
import { ISet } from 'src/app/Interfaces/iset.interface';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.scss']
})
export class SetListComponent {

  @Input() set?: ISet;

}
