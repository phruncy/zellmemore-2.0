import { Component, OnInit, Input, OnChanges,} from '@angular/core';
import { AutomatonService } from '../../services/automaton.service';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-automaton-controller',
  templateUrl: './automaton-controller.component.html',
  styleUrls: ['./automaton-controller.component.scss'],
})
export class AutomatonControllerComponent implements OnInit {

    faAngleDown = faAngleDown;

    constructor(public automaton: AutomatonService) { }

    ngOnInit() {}
}
