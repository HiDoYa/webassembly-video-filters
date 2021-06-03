import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'msToFps', pure: false})
export class MsToFps implements PipeTransform {
  transform(value: number): string {
    return (1 / (value / 1000)).toPrecision(5);
  }
}

@Pipe({name: 'getAvg', pure: false})
export class GetAvg implements PipeTransform {
  transform(array: Array<number>): number {
    return array.reduce((a: any, b: any) => a + b) / array.length;
  }
}

@Pipe({name: 'getName'})
export class GetName implements PipeTransform {
  transform(obj: any): string {
    return obj.name;
  }
}

@Pipe({name: 'last', pure: false})
export class LastElement implements PipeTransform {
  transform(array: Array<any>): any {
    return array[array.length - 1];
  }
}

@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {
  transform(array: Array<any>): any {
    return array.sort((a, b) => a.key.localeCompare(b.key));
  }
}