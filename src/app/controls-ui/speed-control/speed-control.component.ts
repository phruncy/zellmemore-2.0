import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';

@Component({
  selector: 'app-speed-control',
  templateUrl: './speed-control.component.html',
  styleUrls: ['./speed-control.component.scss']
})
export class SpeedControlComponent implements OnInit {

    private _speedMin = 1;
    private _speedMax = 30;
  constructor(public automaton: AutomatonService) { }

    get speedMin(): number {
        return this._speedMin;
    }

    get speedMax(): number {
        return this._speedMax;
    }

  ngOnInit() {}
}
