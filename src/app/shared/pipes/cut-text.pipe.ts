import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText'
})
export class CutTextPipe implements PipeTransform {
  transform(value: string, maxLength: number = 100): string {
    return value.length <= maxLength ? value : `${value.slice(0, maxLength)}...`
  }
}
