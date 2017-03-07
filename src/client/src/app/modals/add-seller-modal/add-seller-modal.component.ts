import { Component, ViewContainerRef, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { StoreService } from "./../../store.service";

import { Seller } from "./../../../interfaces/seller";

@Component({
    selector: "app-add-seller-modal",
    templateUrl: "./add-seller-modal.component.html",
    styleUrls: ["./add-seller-modal.component.scss"]
})
export class AddSellerModalComponent {

    @Input() toastr;
    @Output() success = new EventEmitter();

    name = "";
    category: string;
    imagePath: string;

    constructor(
        private activeModal: NgbActiveModal,
        private storeService: StoreService
    ) { }

    onAdd() {
        this.name = this.name.trim();
        if (this.name === "") {
            this.toastr.error(
                "Name can't be empty",
                "Name error");
            return;
        }

        const seller: Seller = {
            id: 0,
            name: this.name,
            category: this.category,
            imagePath: this.imagePath
        };

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
}
