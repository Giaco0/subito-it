import { Component, TemplateRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})

export class ProductsDetailComponent {
  productId: any;
  listData: any = {};
  isEditing: boolean = false;
  editingProductData: any = {};
  smallImageList: string[] = [];
  largeImage: string | null = null;
  newProduct: any = {};

  constructor(
    private param: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productId = this.param.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productsService.getProduct(this.productId).subscribe(
        (data: any) => {
          this.listData = data;
          this.smallImageList = data.product_images.map((image: any) => image.url_image);
          if (this.smallImageList.length > 0) {
            this.largeImage = this.smallImageList[0];
          }
        },
        (error) => {
          console.error(
            'Errore nel recupero dei dettagli del prodotto:',
            error
          );
        }
      );
    }
  }

  deleteProduct() {
    if (this.productId) {
      if (confirm('Sei sicuro di voler cancellare questo prodotto?')) {
        this.productsService.deleteProduct(this.productId).subscribe(
          () => {
            console.log('Prodotto cancellato con successo.');
          },
          (error) => {
            console.error('Errore nella cancellazione del prodotto:', error);
          }
        );
      }
    }
  }

  editProduct() {
    this.isEditing = true;
    this.editingProductData = { ...this.listData };
  }

  dismissEdit() {
    this.isEditing = false;
  }

  saveProductChanges() {
    this.productsService.updateProduct(this.productId, this.editingProductData).subscribe(
      () => {
        console.log('Modifiche al prodotto salvate con successo.');
        this.listData = { ...this.editingProductData };
        this.isEditing = false;
      },
      (error) => {
        console.error('Errore nel salvataggio delle modifiche:', error);
      }
    );
  }

  showLargeImage(image: string): void {
    this.largeImage = image;
  }

  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

}
