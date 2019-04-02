import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-status-flow',
  templateUrl: './status-flow.component.html',
  styleUrls: ['./status-flow.component.scss']
})
export class StatusFlowComponent implements OnChanges {

  @Input() statusString: string = null;
  @Input() statusStringOptions: string[] = null;
  @Output() changes = new EventEmitter<string>();

  statusArray: string[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // runs once before ngOnInit so skip until inputs are defined
    if (this.statusString !== null && this.statusStringOptions !== null) {
      this.statusArray = this.calcStatusArray(this.statusString, this.statusStringOptions);
      console.log('set status in onChange to %o', this.statusArray);
      this.changes.emit(this.statusArray.join(','));
    }
  }

  setStatus($event: string, index: number) {
    console.log('event %o at index %o', $event, index);
    this.statusArray[index] = $event;
    this.statusArray = this.calcStatusArray(this.statusArray.join(','), this.statusStringOptions);
    console.log('set status to %o', this.statusArray);
    this.changes.emit(this.statusArray.join(','));
  }

  calcStatusArray(statusString: string, statusStringOptions: string[]): string[] {
    const statusArray: string[]= statusString.split(',');
    const statusOptionsArray: string[][] = statusStringOptions.map(x => x.split(','));

    return [
      this.isFirstOptionSelected(statusArray[1], statusOptionsArray[1]) ? statusArray[0] : statusOptionsArray[0][2],
      this.isFirstOptionSelected(statusArray[2], statusOptionsArray[2]) ? statusArray[1] : statusOptionsArray[1][2],
      statusArray[2]];
  }

  isFirstOptionSelected(status: string, optionsOfSection: string[]): boolean {
    return optionsOfSection.indexOf(status) === 0;
  }

}
