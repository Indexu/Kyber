import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { StoreService } from "./../../store.service";

import { ProductModalComponent } from "./product-modal.component";

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
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
