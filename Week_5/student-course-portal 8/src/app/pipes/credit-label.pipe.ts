import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel'
})
export class CreditLabelPipe implements PipeTransform {
  transform(credits: number | null | undefined): string {
    // Edge cases: null / 0 -> 'No Credits'
    if (credits == null || credits === 0) {
      return 'No Credits';
    }
    return credits === 1 ? '1 Credit' : `${credits} Credits`;
  }
}
