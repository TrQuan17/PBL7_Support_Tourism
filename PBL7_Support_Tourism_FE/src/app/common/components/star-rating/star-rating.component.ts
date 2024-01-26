import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-star-rating',
    templateUrl: './star-rating.component.html',
    styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit{
    @Input() showVote = -1;
    @Output() voteEmitter = new EventEmitter<number>;
    
    public voteForm!: FormGroup;
    
    constructor(private fb: FormBuilder) {
        this.initForm();
    }

    ngOnInit(): void {
        this.valueChangesVote();
    }

    initForm(): void {
        this.voteForm = this.fb.group({
            vote: new FormControl(4)
        });
    }

    public valueChangesVote(): void {
        this.voteForm.get('vote')?.valueChanges.subscribe(
            value => {
                this.voteEmitter.emit(value);
            }
        )
    }

    public showStarVote(): {vote: string, noVote: string} {
        let vote = '';
        let noVote = '';
        for(let i = 0; i < Math.round(this.showVote); i++) {
            vote = vote + '⬤ '
        }

        for(let i = 0; i < 5 - Math.round(this.showVote); i++) {
            noVote = noVote + '⬤ '
        }

        return {vote : vote, noVote: noVote};
    }
}
