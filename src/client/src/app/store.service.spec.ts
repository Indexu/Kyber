import { Product } from "./../interfaces/product";
import { TestBed, inject } from "@angular/core/testing";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { StoreService } from "./store.service";

import { Seller } from "./../interfaces/seller";

import "rxjs/Rx";

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

const sellerListJSON = `[
{"id":1,"name":"Elko","category":"Deception","imagePath":""},
{"id":2,"name":"Advania","category":"Great software solutions","imagePath":""},
{"id":3,"name":"Logan","category":"Adamantium","imagePath":""}
]`;

const sellerJSON = `{"id":1,"name":"Elko","category":"Deception","imagePath":""}`;

const productsJSON = `[
{"id": 1,"name": "Ullarvettlingar","price": 1899,"quantitySold": 500,"quantityInStock": 12,"imagePath": ""},
{"id": 2,"name": "Ullarsokkar","price": 2199,"quantitySold": 488,"quantityInStock": 9,"imagePath": ""},
{"id": 3,"name": "Trefill","price": 999,"quantitySold": 600,"quantityInStock": 23,"imagePath": ""}
]`;

const product: Product = {
    id: 1,
    name: "Ullarvettlingar",
    price: 1899,
    quantitySold: 500,
    quantityInStock: 12,
    imagePath: ""
};

const sellers = "http://localhost:5000/api/sellers";

class MockResponse {
    constructor(
        private jsonString: string,
        private status: number
    ) { }

    json() {
        return this.jsonString;
    }
}

class MockHttp {
    url: string;
    responseJSON: string;
    responseStatus: number;

    get(url: string): Observable<MockResponse> {
        this.url = url;
        return Observable.of(new MockResponse(this.responseJSON, this.responseStatus));
    }

    post(url: string, data: any): Observable<MockResponse> {
        this.url = url;
        return Observable.of(new MockResponse(this.responseJSON, this.responseStatus));
    }

    put(url: string, data: any): Observable<MockResponse> {
        this.url = url;
        return Observable.of(new MockResponse(this.responseJSON, this.responseStatus));
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

        mockHttp.url = "";
    });

    it("should be created", inject([StoreService], (service: StoreService) => {
        expect(service).toBeTruthy();
    }));

    // getSellers
    describe("getSellers", () => {
        it("should call correct URL using get", inject([StoreService], (service: StoreService) => {
            // Arrange
            mockHttp.responseJSON = sellerListJSON;
            mockHttp.responseStatus = 200;

            // Act
            service.getSellers().subscribe();

            // Assert
            expect(mockHttp.url).toEqual(sellers);
        }));
    });

    // getSeller ID
    describe("getSeller", () => {
        it("should call correct URL using get", inject([StoreService], (service: StoreService) => {
            // Arrange
            mockHttp.responseJSON = sellerJSON;
            mockHttp.responseStatus = 200;
            const id = 1;

            // Act
            service.getSeller(id).subscribe();

            // Assert
            expect(mockHttp.url).toEqual(sellers + "/" + id);
        }));
    });

    // getProducts
    describe("getProducts", () => {
        it("should call correct URL using get", inject([StoreService], (service: StoreService) => {
            // Arrange
            mockHttp.responseJSON = productsJSON;
            mockHttp.responseStatus = 200;
            const id = 1;

            // Act
            service.getProducts(id).subscribe();

            // Assert
            expect(mockHttp.url).toEqual(sellers + "/" + id + "/products");
        }));
    });

    // addSeller
    describe("addSeller", () => {
        it("should call correct URL using get", inject([StoreService], (service: StoreService) => {
            // Arrange
            mockHttp.responseJSON = "";
            mockHttp.responseStatus = 201;

            // Act
            service.addSeller(seller).subscribe();

            // Assert
            expect(mockHttp.url).toEqual(sellers);
        }));
    });

    // editSeller
    describe("editSeller", () => {
        it("should call correct URL using get", inject([StoreService], (service: StoreService) => {
            // Arrange
            mockHttp.responseJSON = "";
            mockHttp.responseStatus = 200;

            // Act
            service.editSeller(seller).subscribe();

            // Assert
            expect(mockHttp.url).toEqual(sellers + "/" + seller.id);
        }));
    });

    // addProduct
    describe("addProduct", () => {
        it("should call correct URL using get", inject([StoreService], (service: StoreService) => {
            // Arrange
            mockHttp.responseJSON = "";
            mockHttp.responseStatus = 200;
            const id = 1;

            // Act
            service.addProduct(id, product).subscribe();

            // Assert
            expect(mockHttp.url).toEqual(sellers + "/" + id + "/products");
        }));
    });

    // editProduct
    describe("editProduct", () => {
        it("should call correct URL using get", inject([StoreService], (service: StoreService) => {
            // Arrange
            mockHttp.responseJSON = "";
            mockHttp.responseStatus = 200;
            const id = 1;

            // Act
            service.editProduct(id, product).subscribe();

            // Assert
            expect(mockHttp.url).toEqual(sellers + "/" + id + "/products/" + product.id);
        }));
    });
});

function sellerListCompare(otherList: Seller[]) {
    if (sellerList.length !== otherList.length) {
        return false;
    }

    otherList = otherList.sort((s1, s2) => {
        if (s1.id < s2.id) {
            return -1;
        } else if (s2.id < s1.id) {
            return 1;
        } else {
            return 0;
        }
    });

    for (let i = 0; i < sellerList.length; i++) {
        const currentSeller = sellerList[i];

        for (const key in currentSeller) {
            if (currentSeller.hasOwnProperty(key)) {
                if (currentSeller[key] !== otherList[i][key]) {
                    return false;
                }
            }
        }
    }

    return true;
}
