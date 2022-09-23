import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "convertToSpace"
})
export class ProductListPipe implements PipeTransform {

    transform(value: any, character: any) {
        return value.replace(character, ' ');
    }

}