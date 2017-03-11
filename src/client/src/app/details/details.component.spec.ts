import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
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
        imagePath: ""
    },
    {
        id: 3,
        name: "Crappy Headphones",
        price: 50000,
        quantitySold: 3,
        quantityInStock: 0,
        imagePath: ""
    },
    {
        id: 2,
        name: "Overpriced TV",
        price: 1200000,
        quantitySold: 2,
        quantityInStock: 0,
        imagePath: ""
    },
    {
        id: 3,
        name: "Less Crappy Headphones",
        price: 50000,
        quantitySold: 3,
        quantityInStock: 0,
        imagePath: ""
    }
];

// ========= MOCK CLASSES =========

// Observable
class ObservableMock {
    constructor(
        private observableSuccess: boolean,
        private observableData: any
    ) { }

    subscribe(fnSuccess, fnError) {
        if (this.observableSuccess) {
            fnSuccess(this.observableData);
        } else {
            fnError(this.observableData);
        }
    }
}

// Store Service
class StoreServiceMock {
    observableSellerSuccess = true;
    observableProductSuccess = true;
    observableDataSeller: any;
    observableDataProduct: any;

    getSeller(id: number): ObservableMock {
        return new ObservableMock(this.observableSellerSuccess, this.observableDataSeller);
    }

    getProducts(id: number): ObservableMock {
        return new ObservableMock(this.observableProductSuccess, this.observableDataProduct);
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
    error: jasmine.createSpy("error"),
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

        mockToastr.success.calls.reset();
        mockToastr.error.calls.reset();
        mockService.observableSellerSuccess = true;
        mockService.observableProductSuccess = true;
        mockService.observableDataSeller = seller;
        mockService.observableDataProduct = productList;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
        expect(mockToastr.setRootViewContainerRef).toHaveBeenCalled();
    });

    describe("ngOnInit", () => {
        it("should have correct data after loading", () => {
            // Arrange

            // Act
            component.ngOnInit();

            // Assert
            expect(component.seller).toEqual(seller);
            expect(component.products).toEqual(productList);
        });

        it("should 404 loading seller", () => {
            // Arrange
            mockService.observableSellerSuccess = false;
            mockService.observableDataSeller = {
                status: 404
            };

            // Act
            component.ngOnInit();

            // Assert
            expect(mockToastr.error).toHaveBeenCalledTimes(0);
        });

        it("should fatal fail loading seller", () => {
            // Arrange
            mockService.observableSellerSuccess = false;
            mockService.observableDataSeller = {
                status: 500
            };

            // Act
            component.ngOnInit();

            // Assert
            expect(mockToastr.error).toHaveBeenCalled();
            expect(mockToastr.error).toHaveBeenCalledWith("See console for details", "Fatal error");
        });

        it("should fatal fail loading product list", () => {
            // Arrange
            mockService.observableProductSuccess = false;
            mockService.observableDataProduct = {
                status: 500
            };

            // Act
            component.ngOnInit();

            // Assert
            expect(mockToastr.error).toHaveBeenCalled();
            expect(mockToastr.error).toHaveBeenCalledWith("See console for details", "Fatal error");
        });

        it("should display an alert if the seller has no procuts", () => {
            // Arrange
            mockService.observableDataProduct = [];

            // Act
            component.ngOnInit();

            // Assert
            expect(component.products).toEqual([]);

            const elem = fixture.debugElement.queryAll(By.css("p"))[0];

            expect(elem).toBeDefined();
        });
    });

    describe("onAdd", () => {
        it("should display toastr on success", () => {
            // Arrange

            // Act
            component.onAdd();

            // Assert
            expect(mockToastr.success).toHaveBeenCalled();
            expect(mockToastr.success).toHaveBeenCalledWith("Product was added", "Added!");

            // No need to verify getProducts in this scope, since ngOnInit tests it
        });
    });

    describe("onEdit", () => {
        it("should display toastr on success", () => {
            // Arrange
            const id = 1;

            // Act
            component.onEdit(id);

            // Assert
            expect(mockToastr.success).toHaveBeenCalled();
            expect(mockToastr.success).toHaveBeenCalledWith("Product was edited", "Edited!");

            // No need to verify getProducts in this scope, since ngOnInit tests it
        });

        it("should call toastr error if invalid id", () => {
            // Arrange
            const id = 1337;

            // Act
            component.onEdit(id);

            // Assert
            expect(mockToastr.error).toHaveBeenCalled();
            expect(mockToastr.error).toHaveBeenCalledWith("Product not found", "Error");
        });
    });
});
