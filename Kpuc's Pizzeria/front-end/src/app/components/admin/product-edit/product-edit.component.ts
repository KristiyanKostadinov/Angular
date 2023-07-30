import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { TableReservationDialogComponent } from 'src/app/shared/dialogs/table-reservation-dialog/table-reservation-dialog.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public typeOfLogin: any;
  public productForm!: FormGroup;
  public allowedFileTypes = ['image/jpeg', 'image/png'];
  public fileToUpload: any;
  productId!: string;
  product: any;

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem('typeOfLogin');

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      image: [null, [Validators.required, this.validateFileExtension.bind(this)]],
      description: ['', Validators.required],
      type: ['', Validators.required],
    });

     
  }

  validateFileExtension(control: any): { [key: string]: any } | null {
    const file = control.value;
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (!this.allowedFileTypes.includes(file.type) || (fileExtension !== 'jpg' && fileExtension !== 'png')) {
        return { invalidFileType: true };
      }
    }
    return null;
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.fileToUpload = event.target.files.item(0);
    }
  }

  onSubmit(): void {

  }

  addSalad(): void {
    const quantity = 1;
    const salad = "salad";
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);
    formData.append('description', this.productForm.value.description);
    formData.append('image', this.fileToUpload);
    formData.append('quantity', String(quantity));
    formData.append('type', String(salad));

    this.productsService.addSalad(formData).subscribe(
      (response) => {
        // Handle successful response
        console.log(response);
      },
      (error) => {
        // Handle error response
        console.error(error);
      }
    );
    this.reset();
  }

  addPizza(): void {
    const quantity = 1;
    const pizza = "pizza";
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);
    formData.append('description', this.productForm.value.description);
    formData.append('image', this.fileToUpload);
    formData.append('quantity', String(quantity));
    formData.append('type', String(pizza));

    this.productsService.addPizza(formData).subscribe(
      (response) => {
        // Handle successful response
        console.log(response);
      },
      (error) => {
        // Handle error response
        console.error(error);
      }
    );
    this.reset();

  }

  addDessert(): void {
    const quantity = 1;
    const dessert = "dessert";
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);
    formData.append('description', this.productForm.value.description);
    formData.append('image', this.fileToUpload);
    formData.append('quantity', String(quantity));
    formData.append('type', String(dessert));

    this.productsService.addDessert(formData).subscribe(
      (response) => {
        // Handle successful response
        console.log(response);
      },
      (error) => {
        // Handle error response
        console.error(error);
      }
    );
    this.reset();
  }

  reset() {
    this.productForm.reset();
  }
}
