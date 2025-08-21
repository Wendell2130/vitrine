import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datestr',
  standalone: false
})
export class DatestrPipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

}
