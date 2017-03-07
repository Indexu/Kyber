import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastModule } from "ng2-toastr";

import { AppComponent } from "./app.component";
import { SellersComponent } from "./sellers/sellers.component";
import { DetailsComponent } from "./details/details.component";
import { AddSellerModalComponent } from "./modals/add-seller-modal/add-seller-modal.component";

import { StoreService } from "./store.service";

@NgModule({
    declarations: [
        AppComponent,
        SellersComponent,
        AddSellerModalComponent,
        DetailsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        ToastModule.forRoot(),
        RouterModule.forRoot([
            {
                path: "",
                redirectTo: "sellers",
                pathMatch: "full"
            },
            {
                path: "sellers",
                component: SellersComponent
            },
            {
                path: "sellers/:id",
                component: DetailsComponent
            }
        ])
    ],
    entryComponents: [
        AddSellerModalComponent,
    ],
    providers: [StoreService],
    bootstrap: [AppComponent]
})
export class AppModule { }
