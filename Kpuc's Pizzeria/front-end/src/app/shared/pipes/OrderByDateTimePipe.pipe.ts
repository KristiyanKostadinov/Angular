import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {
    transform(array: any[]): any[] {
        if (!Array.isArray(array)) {
            return array;
        }

        return array.sort((a, b) => {
            const timeA = new Date(`1970/01/01 ${a.date}`).getTime();
            const timeB = new Date(`1970/01/01 ${b.date}`).getTime();
            return timeB - timeA;
        }).reverse();
    }
}
