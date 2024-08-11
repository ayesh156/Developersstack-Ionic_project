import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products:any[]=[];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadAllData();
  }

  loadAllData(){
    this.productService.loadAll().subscribe(responseData=>{

      this.products=responseData.map(product=>(
        {
          id:product.payload.doc.id,
          ...product.payload.doc.data()
        }
      ))

    }, error=>{
      console.log(error);
    })
  }

  viewProduct(product: any) {
    this.router.navigate(['/place-order'], {
      state: { product }
    });
  }

}
