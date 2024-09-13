import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'number-input-stepper',
  templateUrl: './number-input-stepper.html',
  styleUrls: ['./number-input-stepper.css']
})
export class NumberInputStepperComponent {
  @Input() value: number = 1;
  @Input() min: number = 0;
  @Input() max: number = 4;

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  increase() {
    if (this.value < this.max) {
      this.value++;
      this.valueChange.emit(this.value);
    }
  }

  decrease() {
    if (this.value > this.min) {
      this.value--;
      this.valueChange.emit(this.value);
    }
  }
}