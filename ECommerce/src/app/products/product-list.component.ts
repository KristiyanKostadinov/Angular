import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Product } from "../interfaces/products";
import { ProductService } from '../services/product.service';
import { ProductListGridComponent } from './product-list-grid/product-list-grid.component';
import { AppComponent } from '../app.component';

@Component({
    selector: "app-product",
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"]
})
export class ProductList implements OnInit, OnDestroy {
    // public gridConfig = product_list_config;
    @ViewChild(ProductListGridComponent) productlistGridComponent!: ProductListGridComponent;

    public imageWidth: number = 50;
    public imageHeight: number = 2;
    public pageTitle: string = "Product List";
    private _filteredList: string = "";
    public showImage: boolean = true;
    public filteredProducts: Product[] = [];
    public products: any;
    public errorMessage: string = "";
    public sub!: Subscription;

    public dbTestData: any;
    public dbElement: any[] = [];

    public get filteredList(): string {
        return this._filteredList;
    }

    public set filteredList(value: string) {
        this._filteredList = value;
        this.filteredProducts = this.performFilter(value);
    }

    public performFilter(filterBy: string): Product[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: Product) =>
            product.productName.toLocaleLowerCase().includes(filterBy)
        );
    }

    public showImages() {
        this.showImage = !this.showImage;
    }

    public onRatingClicked(message: string): void {
        this.pageTitle = "Product List: " + message;
    }

    fillProductList() {
        this.productlistGridComponent.grid.store.add(this.dbElement);
    }

    ngOnInit() {

        this.productService.getProducts().subscribe((data: any) => console.log(data));
        // if (this.products) {
        //     this.gridComponent.grid.store.add(this.products);
        //     this.gridComponent.grid.store.filter();
        // } else {
        // this.productService.getTestDBData().subscribe((res: any) => {
        //     this.products = res.items;
        //     // this.gridComponent.grid.store.add(this.products);
        //     // this.gridComponent.grid.store.filter();
        //     // this.gridComponent.grid.unmask();
        //     this.products.map((data: any) => console.log(data.company_name));
        // });
        // }
        // this.filteredList = "";
        // this.product.getTestDBData().subscribe((data: any) => { console.log(this.dbTestData = data.items[0].company_name); });
        // this.gridConfig.data = this.filteredProducts;
        // this.product.getTestDBData().subscribe(data=>{this.dbTestData = data;console.log(this.dbTestData);return this.dbTestData;});
        // this.sub = this.product.getTestDBData().subscribe((data: any) => { this.dbTestData = data.items});
        // this.sub = this.product.getTestDBData().subscribe((data: any) => {
        //     this.dbTestData = data.items;
        //     this.dbTestData.map((element: any) => {
        //         this.dbElement = element;
        //         console.log(this.dbElement);
        //     });
        //     // const product_list_config: Partial<GridConfig> = {
        //     //     columns: [
        //     //         { type: "number", field: "productId", text: "Id", editor: false, autoWidth: true },
        //     //         {
        //     //             field: "imageUrl", text: "Price",
        //     //             type: 'template',
        //     //             template: (image: any) => {
        //     //                 return `<img style='width: 50px; margin-left: 15px' src='${image.value}'/>`;
        //     //             },
        //     //             editor: false,
        //     //         },
        //     //         {
        //     //             type: "template", field: "productName", text: "Product", autoWidth: true, editor: false,
        //     //             template: ({ record }: any) => {
        //     //                 // return `<a [routerLink]="['/products', ${record.productId}]" routerLinkActive="router-link-active">
        //     //                 return `<a href='/products/${record.productId}'>
        //     //                 ${record.productName}
        //     //                  </a>`
        //     //             }
        //     //         },
        //     //         {
        //     //             field: "productCode", text: "Code", width: 200, editor: false
        //     //         },
        //     //         { type: "date", field: "releaseDate", text: "Available", width: 200, editor: false },
        //     //         {
        //     //             field: "price", text: "Price", width: 200,
        //     //             renderer: (price: any) => {
        //     //                 return `$${price.value}`
        //     //             }, editor: false
        //     //         },
        //     //         { type: "rating", field: "starRating", text: "5 Star Rating", editor: false }
        //     //     ],
        //     //     // features: {
        //     //     //     columnDragToolbar: true
        //     //     // },
        //     //     // listeners: {
        //     //     //     celldblclick: ({ record }: any) => {
        //     //     //         console.log("clicked");
        //     //     //     }
        //     //     // },
        //     //     height: 350
        //     // };
        // });
    }

    constructor(private productService: ProductService, public appComponent: AppComponent) { }
    ngOnDestroy(): void {
        // this.sub.unsubscribe();
    }
}