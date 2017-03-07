import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastsManager } from "ng2-toastr";

import { AddSellerModalComponent } from "./../modals/add-seller-modal/add-seller-modal.component";

import { StoreService } from "./../store.service";

import { Seller } from "./../../interfaces/seller";

@Component({
    selector: "app-sellers",
    templateUrl: "./sellers.component.html",
    styleUrls: ["./sellers.component.scss"]
})
export class SellersComponent implements OnInit {

    sellers: Seller[];

    constructor(
        private storeService: StoreService,
        private router: Router,
        private modalService: NgbModal,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.storeService.getSellers().subscribe(sellers => {
            this.sellers = sellers;
        });
    }

    onRow(id: number, event: any) {
        if (event.target.tagName !== "BUTTON") {
            this.router.navigate(["sellers", id]);
        }
    }

    onAdd() {
        const modalRef = this.modalService.open(AddSellerModalComponent);
        modalRef.componentInstance.toastr = this.toastr;
        modalRef.componentInstance.success.subscribe(added => {
            if (added) {
                this.toastr.success(
                    "Seller was added",
                    "Added!");

                this.storeService.getSellers().subscribe(sellers => {
                    this.sellers = sellers;
                });
            }
        });
    }

    onEdit() {
        console.log("CLICK");
    }
}
