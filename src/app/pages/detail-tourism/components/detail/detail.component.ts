import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { TourismModel, TourismResponse } from 'src/app/common/models';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnChanges{
  @Input() tourismResponse!: TourismResponse;
  public tourism?: TourismModel;

  public ngOnChanges(changes: SimpleChanges) : void {
    if(changes?.['tourismResponse']?.currentValue) {
      this.tourismResponse = clone(changes?.['tourismResponse'].currentValue);
      this.tourism = this.tourismResponse.data as TourismModel;
    }
  }
}
