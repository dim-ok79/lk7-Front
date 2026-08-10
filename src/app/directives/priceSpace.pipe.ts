import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({
  name: 'priceSpace',
  standalone: true // важно для автономных компонентов
})

export class PriceSpacePipe extends DecimalPipe implements PipeTransform {
  override transform(value: any, args?: any): any{
    if (!value) {
      return value;
    }

    const result = super.transform(value, args);
    // @ts-ignore
    return result.toString().replace(',', ' ');
  }
}
