import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { Router } from "@angular/router";

import { AppComponent } from "./app.component";

const mockRouter = {
    navigate: jasmine.createSpy("navigate")
};

describe("AppComponent", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                {
                    provide: Router,
                    useValue: mockRouter
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    it("should create the app", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'Kyber'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual("Kyber");
    }));

    it("should render title in a h1 tag", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("h1").textContent).toContain("Kyber");
    }));
});
