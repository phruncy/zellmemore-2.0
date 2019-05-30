import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';

@Component({
  selector: 'app-cells-control',
  templateUrl: './cells-control.component.html',
  styleUrls: ['./cells-control.component.scss']
})
export class CellsControlComponent implements OnInit {

    private _cellsMin = 10;
    private _cellsMax = 300;
    private _step = 10;

  constructor(public automaton: AutomatonService) { }

    get cellsMin(): number {
        return this._cellsMin;
    }

    get cellsMax(): number {
        return this._cellsMax;
    }

    get step(): number {
        return this._step;
    }

  ngOnInit() {}
}
