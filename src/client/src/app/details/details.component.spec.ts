import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastsManager } from "ng2-toastr";

import { DetailsComponent } from "./details.component";

import { StoreService } from "./../store.service";

import { Product } from "./../../interfaces/product";
import { Seller } from "./../../interfaces/seller";

// ====== TEST DATA ======

const seller: Seller = {
    id: 1,
    name: "Elko",
    category: "Deception",
    imagePath: ""
};

const productList: Product[] = [
    {
        id: 1,
        name: "Horizon Zero Dawn",
        price: 12000,
        quantitySold: 1,
        quantityInStock: 0,
        imagePath: "imagepath"
    },
    {
        id: 2,
        name: "Overpriced TV",
        price: 1200000,
        quantitySold: 1,
        quantityInStock: 0,
        imagePath: "imagepath"
    },
    {
        id: 3,
        name: "Headphones",
        price: 50000,
        quantitySold: 1,
        quantityInStock: 0,
        imagePath: "imagepath"
    }
];

// ========= MOCK CLASSES =========

// Store Service
class StoreServiceMock {
    getSeller(): Observable<Seller> {
        return Observable.of(seller);
    }

    getProducts(): Observable<Product[]> {
        return Observable.of(productList);
    }
}

// NgbModal
class NgbModalMock {
    open(): any {
        return {
            componentInstance: {
                toastr: undefined,
                success: {
                    subscribe: function (fnSuccess) {
                        fnSuccess(true);
                    }
                }
            }
        };
    }
}

// ======= MOCKS / SPIES ========

// Mock Store Service
const mockService = new StoreServiceMock();

// Mock Activated Route
const mockRoute = {
    snapshot: {
        params: {
            id: 1
        }
    }
};

// Mock Toastr
const mockToastr = {
    success: jasmine.createSpy("success"),
    setRootViewContainerRef: jasmine.createSpy("setRootViewContainerRef")
};

// Mock NgbModal
const mockModal = new NgbModalMock();

describe("DetailsComponent", () => {
    let component: DetailsComponent;
    let fixture: ComponentFixture<DetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailsComponent],
            imports: [NgbModule.forRoot()],
            providers: [
                {
                    provide: StoreService,
                    useValue: mockService
                },
                {
                    provide: ActivatedRoute,
                    useValue: mockRoute
                },
                {
                    provide: ToastsManager,
                    useValue: mockToastr
                },
                {
                    provide: NgbModal,
                    useValue: mockModal
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
