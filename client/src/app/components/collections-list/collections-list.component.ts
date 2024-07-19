import { Component, Input } from '@angular/core';
import { ICollection } from 'src/app/Interfaces/icollection.interface';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss']
})
export class CollectionsListComponent {

  @Input() collection?: ICollection;

}
