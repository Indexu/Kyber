import { Component, ViewContainerRef, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { StoreService } from "./../../store.service";

import { Product } from "./../../../interfaces/product";

@Component({
    selector: "app-product-modal",
    templateUrl: "./product-modal.component.html",
    styleUrls: ["./product-modal.component.scss"]
})
export class ProductModalComponent implements OnInit {

    @Input() toastr;
    @Output() success = new EventEmitter();

    @Input() editing: boolean;

    @Input() sellerID: number;
    @Input() id: number;
    @Input() name = "";
    @Input() price: number;
    @Input() quantityInStock: number;
    @Input() imagePath: string;

    title: string;

    constructor(
        public activeModal: NgbActiveModal,
        private storeService: StoreService
    ) { }

    ngOnInit() {
        if (this.editing) {
            this.title = "Edit product";
        } else {
            this.title = "Add product";
        }
    }

    onSubmit() {
        this.name = this.name.trim();
        if (this.name === "") {
            this.toastr.error(
                "Name can't be empty",
                "Name error");
            return;
        }

        const product: Product = {
            id: this.id,
            name: this.name,
            price: this.price,
            quantitySold: 0,
            quantityInStock: this.quantityInStock,
            imagePath: this.imagePath
        };

        if (this.editing) {
            this.edit(product);
        } else {
            this.add(product);
        }
    }

    private add(product: Product) {
        this.storeService.addProduct(this.sellerID, product).subscribe(success => {
            if (success) {
                this.success.emit(true);
                this.activeModal.close();
            } else {
                this.toastr.error(
                    "Could not add product",
                    "Add error");
                console.log(success);
            }
        }, error => {
            this.toastr.error(
                "See console for details",
                "Fatal error");

            console.log(error);
        });
    }

    private edit(product: Product) {
        this.storeService.editProduct(this.sellerID, product).subscribe(success => {
            if (success) {
                this.success.emit(true);
                this.activeModal.close();
            } else {
                this.toastr.error(
                    "Could not edit product",
                    "Edit error");
                console.log(success);
            }
        }, error => {
            this.toastr.error(
                "See console for details",
                "Fatal error");

            console.log(error);
        });
    }
}
