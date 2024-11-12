import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProgramWindowComponent } from './program-window/program-window.component';
import { AppRoutingModule } from './app-routing.module';
import { AutomatonConfigurationService } from './services/automaton-configuration.service';
import { WidgetComponent } from './widget/widget.component';
import { VisualizationDetailComponent } from './visualization-detail/visualization-detail.component';
import { VisualizationSelectionComponent } from './visualization-selection/visualization-selection.component';
import { HttpClientModule } from '@angular/common/http';
import { ClickOutsideModule } from 'ng-click-outside';
import { Testing02Component } from './widget-content/barcodes/testing02.component';
import { AutomatonControllerComponent } from './controls-ui/automaton-controller/automaton-controller.component';
import { CustomFooterComponent } from './custom-footer/custom-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetFrameComponent } from './widget-frame/widget-frame.component';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacySliderModule as MatSliderModule} from '@angular/material/legacy-slider';
import { MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
import { MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import { MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { PopupComponent } from './popup/popup.component';
import { VizDefaultComponent } from './widget-content/default/viz-default.component';
import { VizPunchcardComponent } from './widget-content/punchcard/viz-punchcard.component';
import { VizThreadsComponent } from './widget-content/threads/viz-threads.component';
import { VizFrequencyComponent } from './widget-content/frequency/viz-frequency.component';
import { VizVortexComponent } from './widget-content/vortex/viz-vortex.component';
import { VizSignalsComponent } from './widget-content/signals/viz-signals.component';
import { VizWaves01Component } from './widget-content/waves01/viz-waves01.component';
import { VizWaves02Component } from './widget-content/waves02/viz-waves02.component';
import { VizWaves03Component } from './widget-content/waves03/viz-waves03.component';
import { VizWaves04Component } from './widget-content/waves04/viz-waves04.component';
import { StatusDisplayComponent } from './controls-ui/status-display/status-display.component';
import { ChaosComponent } from './widget-content/chaos/chaos.component';
import { RuleControlComponent } from './controls-ui/automaton-controller/rule-control/rule-control.component';
import { SpeedControlComponent } from './controls-ui/speed-control/speed-control.component';
import { EdgeControlComponent } from './controls-ui/edge-control/edge-control.component';
import { CellsControlComponent } from './controls-ui/cells-control/cells-control.component';
import { StateControlComponent } from './controls-ui/state-control/state-control.component';
import { TopbarComponent } from './controls-ui/topbar/topbar.component';
import { SelectionTileComponent } from './selection-tile/selection-tile.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { HeaderComponent } from './homepage/header/header.component';
import { AboutComponent } from './homepage/about/about.component';
import { CaTutorialComponent } from './homepage/ca-tutorial/ca-tutorial.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { TutorialAnimationComponent } from './homepage/tutorial-animation/tutorial-animation.component';
import { TutorialStepControlComponent } from './homepage/tutorial-step-control/tutorial-step-control.component';
import { Step01Component } from './homepage/tutorial-animation/step01/step01.component';
import { Step02Component } from './homepage/tutorial-animation/step02/step02.component';
import { Step03Component } from './homepage/tutorial-animation/step03/step03.component';
import { Step04Component } from './homepage/tutorial-animation/step04/step04.component';
import { Step05Component } from './homepage/tutorial-animation/step05/step05.component';
import { Step06Component } from './homepage/tutorial-animation/step06/step06.component';
import { StepFinalComponent } from './homepage/tutorial-animation/step-final/step-final.component';
import { WidgetDirective } from './utils/widget.directive';



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProgramWindowComponent,
        WidgetComponent,
        VisualizationDetailComponent,
        VisualizationSelectionComponent,
        Testing02Component,
        AutomatonControllerComponent,
        WidgetFrameComponent,
        PopupComponent,
        VizDefaultComponent,
        VizPunchcardComponent,
        VizThreadsComponent,
        VizFrequencyComponent,
        VizVortexComponent,
        VizSignalsComponent,
        VizWaves01Component,
        VizWaves02Component,
        VizWaves03Component,
        VizWaves04Component,
        StatusDisplayComponent,
        CustomFooterComponent,
        ChaosComponent,
        RuleControlComponent,
        SpeedControlComponent,
        EdgeControlComponent,
        CellsControlComponent,
        StateControlComponent,
        TopbarComponent,
        SelectionTileComponent,
        ImpressumComponent,
        HeaderComponent,
        AboutComponent,
        CaTutorialComponent,
        DisclaimerComponent,
        TutorialAnimationComponent,
        TutorialStepControlComponent,
        Step01Component,
        Step02Component,
        Step03Component,
        Step04Component,
        Step05Component,
        Step06Component,
        StepFinalComponent,
        WidgetDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ClickOutsideModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FontAwesomeModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatCheckboxModule,
        MatInputModule,
        MatMenuModule,
        MatCardModule,
        MatButtonModule,
        MatRippleModule,
        MatDividerModule
    ],
    providers: [AutomatonConfigurationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
