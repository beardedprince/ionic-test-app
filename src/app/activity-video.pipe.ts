import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activityVideo'
})
export class ActivityVideoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
