import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from './shared/products.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isSignedIn!: boolean;
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  newProduct: any = {};
  isFormVisible: boolean = false;
  pageSize = 9;
  currentPage = 1;
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    private productsService: ProductsService,
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit() {
    this.auth.userAuthState.subscribe((val: boolean) => {
      this.isSignedIn = val;
    });
    this.getProducts();
  }
  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }

  open(content: any) {
    this.modalService.open(content);
  }

  getProducts() {
    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filterProducts();
    });
  }

  filterProducts() {
    const searchTerm = this.searchTerm.trim().toLowerCase();
    if (searchTerm === '') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        (product) =>
          product.common_name.toLowerCase().includes(searchTerm) ||
          product.country.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
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
