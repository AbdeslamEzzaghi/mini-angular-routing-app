import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure : false // would cause performance issues
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString : string , prop : string) {
    if(value.length == 0 || filterString == ''){
      return value;
    }

    const filteredValue = [];

    for(let val of value){
      if(val[prop].startsWith(filterString)){
        filteredValue.push(val);
      }
    }

    return filteredValue;
  }

}
