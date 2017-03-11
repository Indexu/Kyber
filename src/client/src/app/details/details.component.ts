import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastsManager } from "ng2-toastr";
import { ActivatedRoute } from "@angular/router";

import { StoreService } from "./../store.service";

import { ProductModalComponent } from "./../modals/product-modal/product-modal.component";

import { Seller } from "./../../interfaces/seller";
import { Product } from "./../../interfaces/product";

@Component({
    selector: "app-details",
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
    id: number;
    notFound = false;
    fatal = false;

    seller: Seller = {
        id: 0,
        name: "",
        category: "",
        imagePath: ""
    };

    products: Product[] = [];
    topProducts: Product[] = [];

    constructor(
        private storeService: StoreService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        // Get seller id based on URL
        this.id = this.route.snapshot.params["id"];

        // Get seller and products
        this.storeService.getSeller(this.id).subscribe(seller => {
            if (seller !== undefined) {
                this.seller = seller;

                this.getProducts();
            }
        }, error => {
            // Error fetching seller
            this.notFound = true;
            if (error.status !== 404) {
                // Unknown error (most likely server error)
                this.toastr.error(
                    "See console for details",
                    "Fatal error");

                console.log(error);
            }
        });
    }

    onAdd() {
        const modalRef = this.modalService.open(ProductModalComponent);

        modalRef.componentInstance.toastr = this.toastr; // Pass toastr
        modalRef.componentInstance.editing = false; // Set editing to false

        modalRef.componentInstance.sellerID = this.id; // Pass seller ID

        modalRef.componentInstance.success.subscribe(added => {
            this.toastr.success(
                "Product was added",
                "Added!");

            this.getProducts(); // Refresh product list
        });
    }

    onEdit(id: number) {
        let product: Product = undefined;
        // Search for the product to edit
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                product = this.products[i];
            }
        }

        // If found, proceed
        if (product !== undefined) {
            const modalRef = this.modalService.open(ProductModalComponent);

            modalRef.componentInstance.toastr = this.toastr; // Pass toastr
            modalRef.componentInstance.editing = true; // Set editing to true

            modalRef.componentInstance.sellerID = this.id; // Pass seller id

            // Pass product info
            modalRef.componentInstance.id = product.id;
            modalRef.componentInstance.name = product.name;
            modalRef.componentInstance.price = product.price;
            modalRef.componentInstance.quantityInStock = product.quantityInStock;
            modalRef.componentInstance.imagePath = product.imagePath;

            modalRef.componentInstance.success.subscribe(added => {
                this.toastr.success(
                    "Product was edited",
                    "Edited!");

                this.getProducts(); // Refresh product list
            });
        } else {
            // Product not found
            this.toastr.error(
                "Product not found",
                "Error");
        }
    }

    private getProducts() {
        this.storeService.getProducts(this.id).subscribe(products => {
            this.products = products;
            this.populateTopTen();
        }, error => {
            // Unknown error (most likely server error)
            this.toastr.error(
                "See console for details",
                "Fatal error");

            console.log(error);
        });
    }

    private populateTopTen() {
        // Sort by quanity sold and get the top 10 products

        let sortedProducts = this.products.slice();
        sortedProducts = sortedProducts.sort((p1, p2) => {
            if (p1.quantitySold < p2.quantitySold) {
                return 1;
            } else if (p2.quantitySold < p1.quantitySold) {
                return -1;
            } else {
                return 0;
            }
        });

        this.topProducts = sortedProducts.slice(0, 10);
    }
}
