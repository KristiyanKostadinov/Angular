// import { GridConfig } from '@bryntum/grid';

// export const product_list_config: Partial<GridConfig> = {
//     columns: [
//         { type: "number", field: "productId", text: "Id", editor: false, autoWidth: true },
//         {
//             field: "imageUrl", text: "Price",
//             type: 'template',
//             template: (image: any) => {
//                 return `<img style='width: 50px; margin-left: 15px' src='${image.value}'/>`;
//             },
//             editor: false,
//         },
//         {
//             type: "template", field: "productName", text: "Product", autoWidth: true, editor: false,
//             template: ({ record }: any) => {
//                 // return `<a [routerLink]="['/products', ${record.productId}]" routerLinkActive="router-link-active">
//                 return `<a href='/products/${record.productId}'>
//                 ${record.productName}
//                  </a>`
//             }
//         },
//         {
//             field: "productCode", text: "Code", width: 200, editor: false
//         },
//         { type: "date", field: "releaseDate", text: "Available", width: 200, editor: false },
//         {
//             field: "price", text: "Price", width: 200,
//             renderer: (price: any) => {
//                 return `$${price.value}`
//             }, editor: false
//         },
//         { type: "rating", field: "starRating", text: "5 Star Rating", editor: false }
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
// }