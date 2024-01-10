import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  newProduct: any = {};
  isFormVisible: boolean = false;
  pageSize = 9;
  currentPage = 1;
  searchTerm1 = '';
  searchTerm2 = '';
  searchTerm3 = '';

  constructor(
    private productsService: ProductsService,
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filterProducts();
    });
  }

  filterProducts() {
    const searchTerm1 = this.searchTerm1.trim().toLowerCase();
    const searchTerm2 = this.searchTerm2.trim().toLowerCase();
    const searchTerm3 = this.searchTerm3.trim().toLowerCase();

    if (searchTerm1 === '' && searchTerm2 === '' && searchTerm3 === '') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        (product) =>
          (searchTerm1 === '' || product.common_name.toLowerCase().includes(searchTerm1)) &&
          (searchTerm2 === '' || product.description.toLowerCase().includes(searchTerm2)) &&
          (searchTerm3 === '' || product.country.toLowerCase().includes(searchTerm3))
      );
    }
    this.currentPage = 1;
  }

  get displayedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredProducts.slice(start, end);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.filteredProducts.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  addProduct() {
    this.productsService.createProduct(this.newProduct).subscribe((data: any) => {
      this.products.push(data);
      this.filterProducts();
    }, error => {
      console.error('There was an error while adding', error);
    });
  }
}
