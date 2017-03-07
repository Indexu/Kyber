import { TestBed, inject } from "@angular/core/testing";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { StoreService } from "./store.service";

import { Seller } from "./../interfaces/seller";

import "rxjs/rx";

const sellerList: Seller[] = [
    {
        id: 1,
        name: "Elko",
        category: "Deception",
        imagePath: "wormtounge.jpg"
    },
    {
        id: 2,
        name: "Advania",
        category: "Great software solutions",
        imagePath: "bruteforced.jpg"
    },
    {
        id: 3,
        name: "Logan",
        category: "Adamantium",
        imagePath: "dedpul.jpg"
    }
];

const sellerListString = `[
{"id":1,"name":"Elko","category":"Deception","imagePath":"wormtounge.jpg"},
{"id":2,"name":"Advania","category":"Great software solutions","imagePath":"bruteforced.jpg"},
{"id":3,"name":"Logan","category":"Adamantium","imagePath":"dedpul.jpg"}
]`;

const sellers = "http://localhost:5000/api/sellers";

class MockHttp {
    getUrl: string;

    get(url: string): Observable<Response> {
        this.getUrl = url;
        return Observable.of(new Response(sellerListString));
    }
}

const mockHttp = new MockHttp();

describe("StoreService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StoreService,
                {
                    provide: Http,
                    useValue: mockHttp
                }
            ]
        });

        mockHttp.getUrl = "";
    });

    it("should be created", inject([StoreService], (service: StoreService) => {
        expect(service).toBeTruthy();
    }));

    /*

    // getSellers
    describe("getSellers", () => {
        it("should call correct URL using get", inject([StoreService], (service: StoreService) => {
            // Arrange

            // Act
            service.getSellers().subscribe(data => {
                expect(data).toEqual(sellerList);
            });

            // Assert
            expect(mockHttp.getUrl).toEqual(sellers);

        }));
    });

    // getSeller ID
    describe("getSeller ID", () => {
        it("should call correct URL using get", () => {
            // Arrange
            const id = 5;

            // Act
            mockHttp.get(sellers + "/" + id);

            // Assert
            expect(mockHttp.getUrl).toEqual(sellers + "/" + id);

        });
    });

    */
});
