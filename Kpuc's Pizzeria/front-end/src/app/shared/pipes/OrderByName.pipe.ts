import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})
export class OrderByNamePipe implements PipeTransform {
    transform(array: any[], propertyName: string): any[] {
        if (!array || array.length <= 1) {
            return array;
        }

        return array.sort((a, b) => {
            if (a[propertyName] < b[propertyName]) {
                return -1;
            }
            if (a[propertyName] > b[propertyName]) {
                return 1;
            }
            return 0;
        });
    }
}