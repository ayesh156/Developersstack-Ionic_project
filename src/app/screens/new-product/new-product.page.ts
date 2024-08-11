import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  selectedFile: File | null = null;
  productName!: string;
  productCost!: string;
  productDescription!: string;

  constructor(private productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  selectFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.selectedFile) {
      this.showErrorMessage('Please insert as image!');
      return;
    }

    if (!this.productCost && !this.productDescription && !this.productName) {
      this.showErrorMessage('Something went wrong, try again!');
      return;
    }

    this.productService.uploadFile(this.selectedFile).then(result => {
      console.log(result);

      const data = {
        'url': result,
        'name': this.productName,
        'price': parseInt(this.productCost),
        'description': this.productDescription,
      }

      this.productService.createProduct(data).then(savedResponse => {
        // Clear fields after successful save
        this.selectedFile = null;
        this.productName = '';
        this.productCost = '';
        this.productDescription = '';

        this.showErrorMessage('Product Saved successfully');
      })

    }).catch(error => {
      this.showErrorMessage(error);
    })
  }

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
