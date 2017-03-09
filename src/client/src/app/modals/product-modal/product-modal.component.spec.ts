import { ActivatedRoute } from "@angular/router";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { StoreService } from "./../../store.service";

import { Product } from "./../../../interfaces/product";

import { ProductModalComponent } from "./product-modal.component";

// ========= MOCK CLASSES =========

// Observable
class ObservableMock {
    constructor(
        private observableSuccess: boolean,
        private operationSuccess: boolean
    ) { }

    subscribe(fnSuccess, fnError) {
        if (this.observableSuccess) {
            fnSuccess(this.operationSuccess);
        } else {
            fnError(this.operationSuccess);
        }
    }
}

// Store Service
class StoreServiceMock {
    observableSuccess = true;
    operationSuccess = true;

    addProduct(sellerID: number, product: Product): ObservableMock {
        return new ObservableMock(this.observableSuccess, this.operationSuccess);
    }

    editProduct(sellerID: number, product: Product): ObservableMock {
        return new ObservableMock(this.observableSuccess, this.operationSuccess);
    }
}

// ======= MOCKS / SPIES ========

const mockService = new StoreServiceMock();

const mockActiveModal = {
    close: jasmine.createSpy("close")
};

const mockToastr = {
    error: jasmine.createSpy("error")
};

const mockSuccess = {
    emit: function () { }
};

describe("ProductModalComponent", () => {
    let component: ProductModalComponent;
    let fixture: ComponentFixture<ProductModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ProductModalComponent],
            providers: [
                {
                    provide: StoreService,
                    useValue: mockService
                },
                {
                    provide: NgbActiveModal,
                    useValue: mockActiveModal
                }
            ]
        })
            .compileComponents();

        mockToastr.error.calls.reset();
        mockActiveModal.close.calls.reset();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have add title", () => {
        // Arrange
        component.editing = false;

        // Act
        component.ngOnInit();

        // Assert
        expect(component.title).toEqual("Add product");
    });

    it("should have edit title", () => {
        // Arrange
        component.editing = true;

        // Act
        component.ngOnInit();

        // Assert
        expect(component.title).toEqual("Edit product");
    });

    describe("onSubmit", () => {
        it("should fail and call toastr", () => {
            // Arrange
            component.name = "";
            component.toastr = mockToastr;

            // Act
            component.onSubmit();

            // Assert
            expect(mockToastr.error).toHaveBeenCalled();
            expect(mockToastr.error).toHaveBeenCalledWith("Name can't be empty", "Name error");
        });

        describe("adding", () => {
            it("should pass validation and successfully add", () => {
                // Arrange
                component.editing = false;
                component.name = "x";
                mockService.observableSuccess = true;
                mockService.operationSuccess = true;
                component.toastr = mockToastr;

                // Act
                component.onSubmit();

                // Assert
                expect(mockActiveModal.close).toHaveBeenCalled();
                expect(mockToastr.error).toHaveBeenCalledTimes(0);
            });

            it("should pass validation and fail to add", () => {
                // Arrange
                component.editing = false;
                component.name = "x";
                mockService.observableSuccess = true;
                mockService.operationSuccess = false;
                component.toastr = mockToastr;

                // Act
                component.onSubmit();

                // Assert
                expect(mockToastr.error).toHaveBeenCalled();
                expect(mockToastr.error).toHaveBeenCalledWith("Could not add product", "Add error");
                expect(mockActiveModal.close).toHaveBeenCalledTimes(0);
            });

            it("should pass validation and encounter fatal error", () => {
                // Arrange
                component.editing = false;
                component.name = "x";
                mockService.observableSuccess = false;
                mockService.operationSuccess = false;
                component.toastr = mockToastr;

                // Act
                component.onSubmit();

                // Assert
                expect(mockToastr.error).toHaveBeenCalled();
                expect(mockToastr.error).toHaveBeenCalledWith("See console for details", "Fatal error");
                expect(mockActiveModal.close).toHaveBeenCalledTimes(0);
            });
        });

        describe("editing", () => {
            it("should pass validation and successfully edit", () => {
                // Arrange
                component.editing = true;
                component.name = "x";
                mockService.observableSuccess = true;
                mockService.operationSuccess = true;
                component.toastr = mockToastr;

                // Act
                component.onSubmit();

                // Assert
                expect(mockActiveModal.close).toHaveBeenCalled();
                expect(mockToastr.error).toHaveBeenCalledTimes(0);
            });

            it("should pass validation and fail to edit", () => {
                // Arrange
                component.editing = true;
                component.name = "x";
                mockService.observableSuccess = true;
                mockService.operationSuccess = false;
                component.toastr = mockToastr;

                // Act
                component.onSubmit();

                // Assert
                expect(mockToastr.error).toHaveBeenCalled();
                expect(mockToastr.error).toHaveBeenCalledWith("Could not edit product", "Edit error");
                expect(mockActiveModal.close).toHaveBeenCalledTimes(0);
            });

            it("should pass validation and encounter fatal error", () => {
                // Arrange
                component.editing = true;
                component.name = "x";
                mockService.observableSuccess = false;
                mockService.operationSuccess = false;
                component.toastr = mockToastr;

                // Act
                component.onSubmit();

                // Assert
                expect(mockToastr.error).toHaveBeenCalled();
                expect(mockToastr.error).toHaveBeenCalledWith("See console for details", "Fatal error");
                expect(mockActiveModal.close).toHaveBeenCalledTimes(0);
            });
        });
    });
});
