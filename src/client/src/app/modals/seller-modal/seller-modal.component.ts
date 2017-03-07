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
        private activeModal: NgbActiveModal,
        private storeService: StoreService
    ) { }

    ngOnInit() {
        if (this.editing) {
            this.title = "Edit seller";
        } else {
            this.title = "Add seller";
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

        const seller: Seller = {
            id: this.id,
            name: this.name,
            category: this.category,
            imagePath: this.imagePath
        };

        if (this.editing) {
            this.edit(seller);
        } else {
            this.add(seller);
        }
    }

    private add(seller: Seller) {
        this.storeService.addSeller(seller).subscribe(success => {
            // Success
            this.success.emit(true);
            this.activeModal.close();
        }, error => {
            // Error
            console.log("Fucked");
            console.log(error);
        });
    }

    private edit(seller: Seller) {
        this.storeService.editSeller(seller).subscribe(success => {
            // Success
            this.success.emit(true);
            this.activeModal.close();
        }, error => {
            // Error
            console.log("Fucked");
            console.log(error);
        });
    }
}
