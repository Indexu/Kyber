import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import "rxjs/rx";

import { Seller } from "./../interfaces/seller";
import { Product } from "./../interfaces/product";

@Injectable()
export class StoreService {

    constructor(private http: Http) { }

    getSellers(): Observable<Seller[]> {
        return this.http.get("http://localhost:5000/api/sellers")
            .map(response => {
                return <Seller[]>response.json();
            });
    }

    getSeller(id: number): Observable<Seller> {
        return this.http.get("http://localhost:5000/api/sellers/" + id)
            .map(response => {
                return <Seller>response.json();
            });
    }

    getProducts(id: number): Observable<Product[]> {
        return this.http.get("http://localhost:5000/api/sellers/" + id + "/products")
            .map(response => {
                return <Product[]>response.json();
            });
    }

    addSeller(seller: Seller): Observable<boolean> {
        return this.http.post("http://localhost:5000/api/sellers", seller)
            .map(response => {
                return response.status === 201;
            });
    }

    editSeller(seller: Seller): Observable<boolean> {
        return this.http.put("http://localhost:5000/api/sellers/" + seller.id, seller)
            .map(response => {
                return response.status === 200;
            });
    }

    addProduct(sellerID: number, product: Product): Observable<boolean> {
        const data = {
            id: sellerID,
            prodId: product.id,
            name: product.name,
            price: product.price,
            quantitySold: product.quantitySold,
            quantityInStock: product.quantityInStock,
            path: product.imagePath
        };

        return this.http.post("http://localhost:5000/api/sellers/" + sellerID + "/products", data)
            .map(response => {
                return response.status === 201;
            });
    }

    editProduct(sellerID: number, product: Product): Observable<boolean> {
        const data = {
            id: sellerID,
            prodId: product.id,
            name: product.name,
            price: product.price,
            quantitySold: product.quantitySold,
            quantityInStock: product.quantityInStock,
            imagePath: product.imagePath
        };

        return this.http.put("http://localhost:5000/api/sellers/" + sellerID + "/products/" + product.id, data)
            .map(response => {
                return response.status === 200;
            });
    }
}
