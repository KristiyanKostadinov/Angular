import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { DataGenerator, Grid, GridConfig } from '@bryntum/grid';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list-grid',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list-grid.component.css']
})
export class ProductListGridComponent implements OnInit, OnDestroy {
  public dbTestData: any;
  public finalData: any;
  private elementRef: ElementRef;
  public PRODUCTS_GRID: any;
  public grid: any;

  constructor(public dbTest: ProductService, public element: ElementRef, private productService: ProductService) {
    this.elementRef = element;
  }

  ngOnDestroy(): void {
    this.grid.destroy();
  }

  ngOnInit(): void {

    this.PRODUCTS_GRID = {
      appendTo: this.elementRef.nativeElement.firstElementChild,
      columns: [
        { type: "number", field: "productId", text: "Id", editor: false, autoWidth: true },
        {
          field: "imageUrl", text: "Price",
          type: 'template',
          template: (image: any) => {
            return `<img style='width: 50px; margin-left: 15px' src='${image.value}'/>`;
          },
          editor: false,
        },
        {
          type: "template", field: "productName", text: "Product", autoWidth: true, editor: false,
          template: ({ record }: any) => {
            // return `<a [routerLink]="['/products', ${record.productId}]" routerLinkActive="router-link-active">
            return `<a href='/products/${record.productId}'>
                  ${record.productName}
                   </a>`
          }
        },
        {
          field: "productCode", text: "Code", width: 200, editor: false
        },
        { type: "date", field: "releaseDate", text: "Available", width: 200, editor: false },
        {
          field: "price", text: "Price", width: 200,
          renderer: (price: any) => {
            return `$${price.value}`
          }, editor: false
        },
        { type: "rating", field: "starRating", text: "5 Star Rating", editor: false }
      ],
      // features: {
      //     columnDragToolbar: true
      // },
      // listeners: {
      //     celldblclick: ({ record }: any) => {
      //         console.log("clicked");
      //     }
      // },
      height: 350,
    }
    this.grid = new Grid(this.PRODUCTS_GRID);
    // this.grid.data = this.product;
    // this.productService.getProducts().subscribe(data=>console.log(data[0].productName));


    // this.dbTestData = this.dbTest.getTestDBData().subscribe((data:any)=>console.log(data.items));
    // this.dbTest.getTestDBData().subscribe((data: any) => {
    //   this.dbTestData = data.items;
    //   console.log(this.dbTestData);
    //   new Grid({
    //     appendTo: document.body,
    //     columns: [
    //       { type: "number", field: "productId", text: "Id", editor: false, autoWidth: true },
    //       {
    //         field: "imageUrl", text: "Price",
    //         type: 'template',
    //         template: (image: any) => {
    //           return `<img style='width: 50px; margin-left: 15px' src='${image.value}'/>`;
    //         },
    //         editor: false,
    //       },
    //       {
    //         type: "template", field: "productName", text: "Product", autoWidth: true, editor: false,
    //         template: ({ record }: any) => {
    //           // return `<a [routerLink]="['/products', ${record.productId}]" routerLinkActive="router-link-active">
    //           return `<a href='/products/${record.productId}'>
    //                 ${record.productName}
    //                  </a>`
    //         }
    //       },
    //       {
    //         field: "productCode", text: "Code", width: 200, editor: false
    //       },
    //       { type: "date", field: "releaseDate", text: "Available", width: 200, editor: false },
    //       {
    //         field: "price", text: "Price", width: 200,
    //         renderer: (price: any) => {
    //           return `$${price.value}`
    //         }, editor: false
    //       },
    //       { type: "rating", field: "starRating", text: "5 Star Rating", editor: false }
    //     ],
    //     // features: {
    //     //     columnDragToolbar: true
    //     // },
    //     // listeners: {
    //     //     celldblclick: ({ record }: any) => {
    //     //         console.log("clicked");
    //     //     }
    //     // },
    //     height: 350
    //   })
    // })
  }


}
