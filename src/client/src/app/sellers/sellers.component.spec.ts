import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastsManager } from "ng2-toastr";
import { Observable } from "rxjs/Observable";

import { StoreService } from "./../store.service";

import { SellersComponent } from "./sellers.component";

import { Seller } from "./../../interfaces/seller";

// ====== TEST DATA ======

const sellerList: Seller[] = [
    {
        id: 1,
        name: "Elko",
        category: "Deception",
        imagePath: ""
    },
    {
        id: 2,
        name: "Advania",
        category: "Great software solutions",
        imagePath: ""
    },
    {
        id: 3,
        name: "Logan",
        category: "Adamantium",
        imagePath: ""
    }
];

const seller: Seller = {
    id: 1,
    name: "Elko",
    category: "Deception",
    imagePath: ""
};

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
    observableSuccess = true;
    observableData: any;

    getSellers(): ObservableMock {
        return new ObservableMock(this.observableSuccess, this.observableData);
    }

    getSeller(id: number): ObservableMock {
        return new ObservableMock(this.observableSuccess, this.observableData);
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

const mockService = new StoreServiceMock();

const mockModal = new NgbModalMock();

const mockToastr = {
    success: jasmine.createSpy("success"),
    error: jasmine.createSpy("error"),
    setRootViewContainerRef: jasmine.createSpy("setRootViewContainerRef")
};

const mockRouter = {
    navigate: jasmine.createSpy("navigate")
};

describe("SellersComponent", () => {
    let component: SellersComponent;
    let fixture: ComponentFixture<SellersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SellersComponent],
            providers: [
                {
                    provide: StoreService,
                    useValue: mockService
                },
                {
                    provide: Router,
                    useValue: mockRouter
                },
                {
                    provide: NgbModal,
                    useValue: mockModal
                },
                {
                    provide: ToastsManager,
                    useValue: mockToastr
                }
            ]
        })
            .compileComponents();

        mockToastr.success.calls.reset();
        mockToastr.error.calls.reset();
        mockRouter.navigate.calls.reset();
        mockService.observableSuccess = true;
        mockService.observableData = sellerList;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SellersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
        expect(mockToastr.setRootViewContainerRef).toHaveBeenCalled();
    });

    it("should have correct data after loading", () => {
        // Arrange

        // Act
        component.ngOnInit();

        // Assert
        expect(component.sellers).toEqual(sellerList);
    });

    it("should fail loading data", () => {
        // Arrange
        mockService.observableSuccess = false;
        mockService.observableData = undefined;

        // Act
        component.ngOnInit();

        // Assert
        expect(mockToastr.error).toHaveBeenCalled();
        expect(mockToastr.error).toHaveBeenCalledWith("See console for details", "Fatal error");
    });

    describe("onRow", () => {
        it("should go to correct seller", () => {
            // Arrange
            const id = 5;
            const event = {
                target: {
                    tagName: "TD"
                }
            };

            // Act
            component.onRow(id, event);

            // Assert
            expect(mockRouter.navigate).toHaveBeenCalled();
            expect(mockRouter.navigate).toHaveBeenCalledWith(["sellers", id]);
        });

        it("should not go when button is pressed", () => {
            // Arrange
            const id = 5;
            const event = {
                target: {
                    tagName: "BUTTON"
                }
            };

            // Act
            component.onRow(id, event);

            // Assert
            expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
        });
    });

    describe("onAdd", () => {
        it("should display toastr on success", () => {
            // Arrange
            mockService.observableSuccess = true;
            mockService.observableData = sellerList;

            // Act
            component.onAdd();

            // Assert
            expect(mockToastr.success).toHaveBeenCalled();
            expect(mockToastr.success).toHaveBeenCalledWith("Seller was added", "Added!");

            // No need to verify getSellers in this scope, since ngOnInit tests it
        });
    });

    describe("onEdit", () => {
        it("should display toastr on success", () => {
            // Arrange
            mockService.observableSuccess = true;
            mockService.observableData = seller;
            const id = 1;

            // Act
            component.onEdit(id);

            // Assert
            expect(mockToastr.success).toHaveBeenCalled();
            expect(mockToastr.success).toHaveBeenCalledWith("Seller was edited", "Edited!");

            // No need to verify getSellers in this scope, since ngOnInit tests it
        });

        it("should fail with 404", () => {
            // Arrange
            mockService.observableSuccess = false;
            mockService.observableData = {
                status: 404
            };
            const id = 1;

            // Act
            component.onEdit(id);

            // Assert
            expect(mockToastr.error).toHaveBeenCalled();
            expect(mockToastr.error).toHaveBeenCalledWith("404 Not Found", "Seller not found");
        });

        it("should fail with fatal error", () => {
            // Arrange
            mockService.observableSuccess = false;
            mockService.observableData = {
                status: 500
            };
            const id = 1;

            // Act
            component.onEdit(id);

            // Assert
            expect(mockToastr.error).toHaveBeenCalled();
            expect(mockToastr.error).toHaveBeenCalledWith("See console for details", "Fatal error");
        });
    });
});




