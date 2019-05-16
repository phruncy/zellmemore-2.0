import { Component, OnInit, NgZone } from '@angular/core';
import { Animations } from './animations';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tutorial-animation',
  templateUrl: './tutorial-animation.component.html',
  styleUrls: ['./tutorial-animation.component.scss'],
  animations: [
    Animations.changeState,
    Animations.fadeIn,
  ]
})
export class TutorialAnimationComponent implements OnInit {

    private isBlack = false;
    private _tutorialStep: number;
    private steps = [
        'What is a cell?',
        'What is an automaton?',
        'Ruleset',
        'Possible Rulesets',
        'Array Modes'
    ]
    private multipleCells = [];
    private _scrollSubscription: Subscription;
    constructor(
                private scrollDispatcher: ScrollDispatcher,
                private zone: NgZone) {
                    this._tutorialStep = 0;
                 }

        set tutorialStep(step: number) {
            this._tutorialStep = step;
            console.log(step);
        }

                ngOnInit() {
      this._scrollSubscription = this.scrollDispatcher.scrolled(100).subscribe(
          () => {
            console.log("scrolled");
            this.zone.run<void>(
                () => {
                    this.addTwoSmallCellsToAnimation();
                });
          });
  }
  triggerChange() {
      this.isBlack = !this.isBlack;
  }

  addTwoSmallCellsToAnimation() {
        if (this.multipleCells.length < 17) {
            this.multipleCells.push(Math.round(Math.random()));
            this.multipleCells.unshift(Math.round(Math.random()));
        } else {
            this._scrollSubscription.unsubscribe();
        }
    }
}
