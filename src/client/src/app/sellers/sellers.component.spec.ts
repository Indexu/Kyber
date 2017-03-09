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

// ========= MOCK CLASSES =========

// Store Service
class StoreServiceMock {
    getSellers(): Observable<Seller[]> {
        return Observable.of(sellerList);
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

    it("should have correct data", () => {
        // Arrange

        // Act
        component.ngOnInit();

        // Assert
        expect(component.sellers).toEqual(sellerList);
    });

    it("onRow should go to correct seller", () => {
        // Arrange
        const id = 5;
        const event = {
            target: "TD"
        };

        // Act
        component.onRow(id, event);

        // Assert
        expect(mockRouter.navigate).toHaveBeenCalled();
        expect(mockRouter.navigate).toHaveBeenCalledWith(["sellers", id]);
    });

    it("onAdd should display toastr", () => {
        // Arrange

        // Act
        component.onAdd();

        // Assert
        expect(mockToastr.success).toHaveBeenCalled();
        expect(mockToastr.success).toHaveBeenCalledWith("Seller was added", "Added!");

        // No need to verify getSellers in this scope, since ngOnInit tests it
    });
});
