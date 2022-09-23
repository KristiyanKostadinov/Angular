import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'pm-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public imgUrl = "";
  public isShown: boolean = false;
  public codeForProduct: string = '';
  public addProductForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.codeForProduct = this.generateCode();
    this.addProductForm = this.fb.group({
      productName: ['', [Validators.minLength(3), Validators.required]],
      productCode: [{ value: this.codeForProduct, disabled: true }, Validators.required],
      releaseDate: ['', Validators.required],
      description: ['', [Validators.minLength(10), Validators.required]],
      price: ['', [Validators.min(1), Validators.required]],
      starRating: ['', [Validators.min(1), Validators.max(5), Validators.required]],
      img: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgUrl = reader.result as string;
      };
    }
    this.isShown = true;
  }

  private generateCode() {
    let resultA: string = '';
    let resultB: string = '';
    let characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numbers: string = "0123456789";
    let charactersLength: number = characters.length;
    let numbersLength: number = numbers.length;
    for (let i = 0; i < 3; i++) {
      resultA += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    for (let i = 0; i < 4; i++) {
      resultB += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
    return resultA + "-" + resultB;
  }

  public saveUser() {
    console.log("NAME: " + this.addProductForm.value.productName + " CODE: " + this.codeForProduct + " RELEASE DATE: " + this.addProductForm.value.releaseDate + " DESCR: " + this.addProductForm.value.description + " IMG: " + this.addProductForm.value.img);
  }
}