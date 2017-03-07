import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { StoreService } from "./../../store.service";

import { SellerModalComponent } from "./seller-modal.component";

// ========= MOCK CLASSES =========

// Store Service
class StoreServiceMock {
    success = true;
    addSeller(): Observable<boolean> {
        return Observable.of(this.success);
    }
}

// ======= MOCKS / SPIES ========

const mockService = new StoreServiceMock();

const mockActiveModal = {
    close: jasmine.createSpy("close")
};

describe("SellerModalComponent", () => {
    let component: SellerModalComponent;
    let fixture: ComponentFixture<SellerModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [SellerModalComponent],
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
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SellerModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
