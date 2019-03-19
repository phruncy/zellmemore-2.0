import { Component, OnInit, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
import { ContentBase } from '../content-base/contentBase.component';
import { AutomatonService } from '../automaton.service';
import { SizeService } from '../size.service';

@Component({
  selector: 'app-viz-default',
  templateUrl: './viz-default.component.html',
  styleUrls: ['./viz-default.component.css']
})
export class VizDefaultComponent extends ContentBase implements AfterContentInit {

    @ViewChild('defaultCanvas')canvas: ElementRef;
    private _ctx: CanvasRenderingContext2D;

    private blockMatrix: number[][] = [];
    private _blockSize: number;
    private _maxDisplayableGenerations: number;

    constructor(
      protected automaton: AutomatonService,
      protected sizeService: SizeService) { 
      super(automaton, sizeService);
  }

  ngAfterContentInit() 
  {
    this._ctx = this.canvas.nativeElement.getContext('2d');
    this.init();
    this.update();
  }

  onResize() {
    this.init();
    this.render();
  }

  onReset()
  {
    this._blockSize = this.getBlocksize();
    this._maxDisplayableGenerations = this.widgetWidth/ this._blockSize;
    this.blockMatrix = [];
    this.update();
  }

  update() 
  {
        const states = this.automaton.cells.map(cell => cell.state);
        this.blockMatrix.push(states);
        if (this.blockMatrix.length > this._maxDisplayableGenerations) {
            this.blockMatrix.shift();
        }
        this.render();
  }

  init() 
  {
    this.canvas.nativeElement.height = this.widgetHeight;
    this.canvas.nativeElement.width = this.widgetWidth;
    this._blockSize = this.getBlocksize();
    this._maxDisplayableGenerations = this.widgetHeight / this._blockSize;
  }

  render()
  {
      this._ctx.clearRect(0, 0, this.widgetWidth, this.widgetHeight);
      for (let row = 0; row < this.blockMatrix.length; row++) {
          this.blockMatrix[row].forEach(
              (state, index) => {
                if (state === 1) {
                    this._ctx.fillRect(
                        index * this._blockSize, 
                        row * this._blockSize, 
                        this._blockSize, this._blockSize
                        );
                }
              }
          );
      }
  }

  getBlocksize(): number
    {
        return (this.widgetWidth / this.automaton.cellnumber);
    }

}
