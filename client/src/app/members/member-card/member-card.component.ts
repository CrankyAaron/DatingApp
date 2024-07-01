import { Component, input } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
    selector: 'app-member-card',
    templateUrl: './member-card.component.html',
    styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
    member = input.required<Member>();
}
