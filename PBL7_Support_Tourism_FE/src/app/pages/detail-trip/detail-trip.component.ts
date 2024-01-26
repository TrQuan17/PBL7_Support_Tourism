/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripModel, TripResponse } from 'src/app/common/models/trip.model';
import { TripService } from 'src/app/common/services/trip.service';

@Component({
    selector: 'app-detail-trip',
    templateUrl: './detail-trip.component.html',
    styleUrls: ['./detail-trip.component.scss']
})
export class DetailTripComponent implements OnInit {
    public trip!: any;
    public tripId = '';

    constructor(
        private router: ActivatedRoute,
        private tripService: TripService
    ) {
        this.tripId = this.router.snapshot.paramMap.get('tripId') as string;
    }

    ngOnInit(): void {
        this.getTripById();
    }

    public getTripById(): void {
        this.tripService.getTripById(this.tripId).subscribe(
            (res: TripResponse) => {
                if(res.status === 'SUCCESS') {
                    this.trip = res.data as TripModel;
                }
            }
        )
    }
}
