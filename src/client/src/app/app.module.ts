import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { SellersComponent } from "./sellers/sellers.component";

import { StoreService } from "./store.service";

@NgModule({
    declarations: [
        AppComponent,
        SellersComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
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
        ])
    ],
    providers: [StoreService],
    bootstrap: [AppComponent]
})
export class AppModule { }
