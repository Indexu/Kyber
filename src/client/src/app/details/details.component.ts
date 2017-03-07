import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastsManager } from "ng2-toastr";
import { ActivatedRoute } from "@angular/router";

import { StoreService } from "./../store.service";

import { Seller } from "./../../interfaces/seller";
import { Product } from "./../../interfaces/product";

@Component({
    selector: "app-details",
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
    id: number;
    seller: Seller = {
        id: 0,
        name: "",
        category: "",
        imagePath: ""
    };
    products: Product[] = [];

    constructor(
        private storeService: StoreService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.id = this.route.snapshot.params["id"];

        this.storeService.getSeller(this.id).subscribe(seller => {
            this.seller = seller;
        });

        this.storeService.getProducts(this.id).subscribe(products => {
            this.products = products;
        });
    }

}
