import { Injectable } from '@angular/core';
import { Subject, config, throwError } from 'rxjs';
import { Cell } from '../utils/cell';
import { RuleConverterService } from './rule-converter.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AutomatonService {

    /*Loop properties */
    private _generation = 0;
    private _lastFrameTime = 0;
    private _isRunning = false;
    private _fps: number;

    /* Cell properties */
    private _cells: Cell[];
    private _cellnumber;
    private _ruleset: number[];
    /* Defines the state of the Array when initialised:
     * 0 = initialise only Middle Cell
     * 1 = initialsie random
     */
    private _initState;
    private _isCircular: boolean; //

    /* Communication with views */
    private _changed = new Subject<void>();
    public changed$ = this._changed.asObservable();
    private _cellsChanged = new Subject<void>();
    public cellsChanged$ = this._cellsChanged.asObservable();
    private _ready = new Subject<void>();
    public ready$ = this._ready.asObservable();
    private _modeChanged = new Subject<void>();
    public modeChanged$ =  this._modeChanged.asObservable();

    private _config: any;

    constructor(
                private converter: RuleConverterService,
                private http: HttpClient
                ) {
        /* functions that are called from outside the service */
        this.loop = this.loop.bind(this);
        this.toggleLoop = this.toggleLoop.bind(this);
        this.generate = this.generate.bind(this);
        this.setupCells = this.setupCells.bind(this);
        /* load configuration */
        this.http.get('../assets/json/automaton-config.json').subscribe(
            data => {
                this._config = data;
                this._fps = this._config.fps;
                this._cellnumber = this._config.cellNumber;
                this._initState = this._config.stateConfiguration;
                this._isCircular = this._config.circular;
                this._ruleset =
                    this.converter.decimalToBinary(
                        parseInt(
                            this._config.startRules[
                                Math.floor(
                                    Math.random() * this._config.startRules.length)], 10));
                this.setupCells(this._cellnumber);
                this._ready.next();
            }
        );
    }

    get generation(): number {
        return this._generation;
    }

    get fps() {
        return this._fps;
    }

    set fps(fps: number) {
        this._fps = fps;
    }

    get cellnumber() {
        return this._cellnumber;
    }

    set cellnumber(cells: number) {
        try {
            if (!((cells >= 0) && (cells <= 300))) {
                const error = new Error('Not a valid number');
                throw error;
            }
            this._cellnumber = cells;
            this.setupCells(cells);
        } catch {
            this.cellnumber = this.cellnumber;
        }
    }

    get cells(): Cell[] {
        return this._cells;
    }

    get ruleset(): number[] {
        return this._ruleset;
    }

    set ruleset(rule: number[])
    {
        this._ruleset = rule;
    }

    get isCircular(): boolean {
        return this._isCircular;
    }

    set isCircular(value: boolean) {
        this._isCircular = value;
        this.setEdges();
        this._modeChanged.next();
    }

    get initState(): String {
        return this._initState;
    }

    set initState(state: String) {
        console.log("triggered");
        try {
            if (!(state === '0' || state === '1')) {
                throw new Error("Invalid State");
            }
            this._initState = state;
            this.reset();
        } catch (error) {
            console.log(error);
            console.log("ppuuu");
            return;
        }
    }

    get isRunning(): boolean {
        return this._isRunning;
    }

    loop(timestamp)
    {
        if (timestamp < this._lastFrameTime + (1000 / this._fps)) {
            requestAnimationFrame(this.loop);
            return;
        }
        this._lastFrameTime = timestamp;
        {
            if (this._isRunning) {
                this.generate();
                requestAnimationFrame(this.loop);
            }
        }
    }

    toggleLoop(): void
    {
        this._isRunning = !this._isRunning;
        if (this._isRunning) {
            requestAnimationFrame(this.loop);
        }
    }

    // applies the automaton's ruleset to the Cell and changes
    // its state.
    // the string triplet is the binary representation of the
    // states of the related cells that define this cells new state.
    calculateState(left: number, middle: number, right: number): number
    {
        let triplet = '';
        // defines where to look in the rule array
        triplet = triplet + left + middle + right;
        const result = this._ruleset[parseInt(triplet, 2)];
        return result;
    }

    generate()
    {
        for (let i = 0; i < this._cells.length; i++) {
            if (this._cells[i].rightNeighbour != null) {
                const left = (i === 0) ? this._cells[i].leftNeighbour.state : this._cells[i].leftNeighbour.formerState;
                const right = (i === this._cells.length - 1) ? this._cells[i].rightNeighbour.formerState : this._cells[i].rightNeighbour.state;
                this._cells[i].formerState = this._cells[i].state;
                this._cells[i].state = this.calculateState(left, this._cells[i].state, right);
                this._cells[i].age ++;
            }
        }
        this._generation++;
        this._changed.next();
    }

    /*
     * this is called when initializing the automaton and whenever the cell
     * number changes
     */
    setupCells(cellNumber: number)
    {
        /* try {
            this.cellnumber = cellNumber;
        } catch (error) {
            console.log(error);
            console.log(this._cellnumber);
            throw new Error('Invalid Cell number.');
        } */
        /* clear cells[] first */
        this._cells = [];
        for (let i = 0; i < cellNumber; i++) {
            this._cells.push(new Cell(0, i));
        }
        this.connectNeighbours();
        this.setEdges();
        this.setupState();
        this._generation = 0;
        this._cellsChanged.next();
    }

    setupState() 
    {
        if (this._initState === "0") {
            const i = Math.floor(this._cells.length / 2);
            this._cells[i].state = 1;
        } else {
            this._cells.forEach(cell => cell.state = Math.round(Math.random()));
        }
    }

    connectNeighbours()
    {
        for (let i = 1; i < this._cells.length - 1; i++) {
            if (this._cells[i].leftNeighbour !== null) {
                this._cells[i].rightNeighbour = null;
                this._cells[i].leftNeighbour = null;
            }
            this._cells[i].leftNeighbour = this._cells[i - 1];
            this._cells[i].rightNeighbour = this._cells[i + 1];
        }
    }

    setEdges()
    {
        if (this._isCircular) {
            this._cells[0].leftNeighbour = this._cells[this._cells.length - 1];
            this._cells[0].rightNeighbour = this._cells[1];
            this._cells[this._cells.length - 1].leftNeighbour = this._cells[this._cells.length - 2];
            this._cells[this._cells.length - 1].rightNeighbour = this._cells[0];
        } else {
            this._cells[0].leftNeighbour = null;
            this._cells[0].rightNeighbour = null;
            this._cells[this._cells.length - 1].leftNeighbour = null;
            this._cells[this._cells.length - 1].rightNeighbour = null;
        }
    }

    toggleArrayMode() {
        this._isCircular = !this._isCircular;
        this.setEdges();
        this._modeChanged.next();
    }

    reset(): void
    {
        this._cells.forEach(cell => cell.reset());
        this._generation = 0;
        this.setupState();
        this._cellsChanged.next();
    }
}


