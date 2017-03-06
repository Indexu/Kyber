import { Component, OnInit } from "@angular/core";
import { StoreService } from "./../store.service";

@Component({
    selector: "app-sellers",
    templateUrl: "./sellers.component.html",
    styleUrls: ["./sellers.component.scss"]
})
export class SellersComponent implements OnInit {

    constructor(private storeService: StoreService) { }

    ngOnInit() {
    }

}
