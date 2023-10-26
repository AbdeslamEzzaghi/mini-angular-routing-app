import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure : false
})
export class SortPipe implements PipeTransform {
  transform(value: any, sortKey: string): any {
    if (
      value.length == 0 ||
      sortKey == '' ||
      !Object.hasOwn(value[0], sortKey)
    ) {
      return value;
    }

    value.sort((a: any, b: any) => {
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    });
    console.log(value);
    return value;
  }
}
