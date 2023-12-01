import { CdkDrag, CdkDragDrop, copyArrayItem, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ProductInformation, TakeProduct } from 'src/app/interfaces';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent implements OnChanges {

  productsOrder: TakeProduct[] = [];
  products: ProductInformation[] = [];
  deleted: ProductInformation[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  drop(event: CdkDragDrop<ProductInformation[]>){
    if(event.container !== event.previousContainer){
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousContainer.data.indexOf(event.item.data),
        this.products.length
      );
      console.log(event);  
    }
  }
  
  delete(event: CdkDragDrop<ProductInformation[]>){
    if (event.previousContainer.id === "orderProducts"){
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );  
    }
  }

}
