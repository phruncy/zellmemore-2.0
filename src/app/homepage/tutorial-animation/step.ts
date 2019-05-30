import { Input, Output, EventEmitter } from '@angular/core';
export abstract class Step {

    @Output() completion = new EventEmitter(true);
    protected _activeDescription = 0;
    public descriptions: string[];

    constructor() {}

    @Input()

    get activeDescription(): number {
        return this._activeDescription;
    }

    set activeDescription(active: number) {
        this._activeDescription = active;
        if (this._activeDescription >= this.descriptions.length) {
            this.completion.emit();
        }
    }
}
