import { Component, OnInit, NgZone, ViewChild, ViewContainerRef, TemplateRef} from '@angular/core';
//import { _MatChipListMixinBase } from '@angular/material/chips';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Step01Component } from './step01/step01.component';
import { Step02Component } from './step02/step02.component';
import { Step03Component } from './step03/step03.component';
import { Step04Component } from './step04/step04.component';
import { Step05Component } from './step05/step05.component';
import { Step06Component } from './step06/step06.component';
import { StepFinalComponent } from './step-final/step-final.component';
import { animations } from '../animations';

@Component({
    selector: 'app-tutorial-animation',
    templateUrl: './tutorial-animation.component.html',
    styleUrls: ['./tutorial-animation.component.scss'],
    animations: [
        animations.slideInOut
    ]
})
export class TutorialAnimationComponent implements OnInit {

    @ViewChild('entry', { read: ViewContainerRef, static: false }) entry: ViewContainerRef;

    private faAngleDown = faAngleDown;
    private faAngleUp = faAngleUp;
    private _activeStepDescription = 0;
    private _tutorialStep: number;
    private _currentTotalSteps = 0;
    private steps: any[];

    constructor() {}

    set tutorialStep(step: number) {
        if (step > this.steps.length) {
            return;
        }
        this._activeStepDescription = 0;
        this._tutorialStep = step;
    }

    get tutorialStep() {
        return this._tutorialStep;
    }

    ngOnInit() {
        this._tutorialStep = 0;
        this.steps = [
            {step: Step01Component, active: false},
            {step: Step02Component, active: false},
            {step: Step04Component, active: false},
            {step: Step03Component, active: false},
            {step: Step05Component, active: false},
            {step: Step06Component, active: false},
            {step: StepFinalComponent, active: false}
        ];
    }

    forwardDescription() {
        if (this._tutorialStep === 0) {
            this.addStep();
            return;
        }
        this._activeStepDescription++;
    }

    goBackInDescription() {
        if (this._activeStepDescription === 0) {
            this.tutorialStep--;
            return;
        }
        this._activeStepDescription--;
    }

    addStep() {
        if (this._tutorialStep >= this.steps.length) {
            return;
        }
        this.steps[this._tutorialStep].active = true;
        this._activeStepDescription = 0;
        this.tutorialStep++;
        this._currentTotalSteps++;
        console.log('step: ' + this._tutorialStep);
    }



}
