
import { API_ENDPOINTS } from "./api.js";

export const get_products = async () => {
    try {
        const products_request = await fetch(API_ENDPOINTS.products.list());
        
        if (!products_request.ok) {
            throw new Error("Error: " + products_request.status);
        }
        
        const data = await products_request.json();
        const products = Array.isArray(data) ? data : (data.products || []);
        return { products };
    } catch (error) {
        console.log("Error: " + error);
        return { products: [] };
    }
}

export const getProductsClassic = (onSuccess, onError) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", API_ENDPOINTS.products.list(), true);
        xhr.timeout = 8000;
        
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    const products = Array.isArray(data) ? data : (data.products || []);
                    if (typeof onSuccess === "function") {
                        onSuccess(products);
                    }
                    resolve({ products });
                } catch (e) {
                    const error = new Error("No se pudo interpretar el JSON recibido.");
                    if (typeof onError === "function") {
                        onError(error);
                    }
                    reject(error);
                }
            } else {
                const error = new Error(`Error HTTP ${xhr.status}: ${xhr.statusText}`);
                if (typeof onError === "function") {
                    onError(error);
                }
                reject(error);
            }
        };
        
        xhr.onerror = function () {
            const error = new Error("Error de red o conexión perdida.");
            if (typeof onError === "function") {
                onError(error);
            }
            reject(error);
        };
        
        xhr.ontimeout = function () {
            const error = new Error("Tiempo de espera agotado.");
            if (typeof onError === "function") {
                onError(error);
            }
            reject(error);
        };
        
        xhr.send();
    });
};