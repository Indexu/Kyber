import { Component, ViewContainerRef, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { StoreService } from "./../../store.service";

import { Seller } from "./../../../interfaces/seller";

@Component({
    selector: "app-seller-modal",
    templateUrl: "./seller-modal.component.html",
    styleUrls: ["./seller-modal.component.scss"]
})
export class SellerModalComponent implements OnInit {

    @Input() toastr;
    @Output() success = new EventEmitter();

    @Input() editing: boolean;

    @Input() id: number;
    @Input() name = "";
    @Input() category: string;
    @Input() imagePath: string;

    title: string;

    constructor(
        public activeModal: NgbActiveModal,
        private storeService: StoreService
    ) { }

    ngOnInit() {
        // Set title according to action
        if (this.editing) {
            this.title = "Edit seller";
        } else {
            this.title = "Add seller";
        }
    }

    onSubmit() {
        // Validate name
        this.name = this.name.trim();
        if (this.name === "") {
            this.toastr.error(
                "Name can't be empty",
                "Name error");
            return;
        }

        /*
         * Do not need to validate image path and category
         * since both are optional and can be anything.
         */

        // Package seller info together
        const seller: Seller = {
            id: this.id,
            name: this.name,
            category: this.category,
            imagePath: this.imagePath
        };

        // Call appropriate function based on action
        if (this.editing) {
            this.edit(seller);
        } else {
            this.add(seller);
        }
    }

    private add(seller: Seller) {
        this.storeService.addSeller(seller).subscribe(success => {
            if (success) {
                // Added, close modal
                this.success.emit(true);
                this.activeModal.close();
            } else {
                // Some sort of error
                this.toastr.error(
                    "Could not add seller",
                    "Add error");
            }
        }, error => {
            // Unknown error (most likely server error)
            this.toastr.error(
                "See console for details",
                "Fatal error");

            console.log(error);
        });
    }

    private edit(seller: Seller) {
        this.storeService.editSeller(seller).subscribe(success => {
            if (success) {
                // Edited, close modal
                this.success.emit(true);
                this.activeModal.close();
            } else {
                // Some sort of error
                this.toastr.error(
                    "Could not edit seller",
                    "Edit error");
            }
        }, error => {
            // Unknown error (most likely server error)
            this.toastr.error(
                "See console for details",
                "Fatal error");

            console.log(error);
        });
    }
}
