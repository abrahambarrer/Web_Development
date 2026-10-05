
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
    const xhr = new XMLHttpRequest();
    xhr.open("GET", API_ENDPOINTS.products.list(), true);
    xhr.timeout = 8000;
    
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
                const products = Array.isArray(data) ? data : (data.products || []);
                onSuccess(products);
            } catch (e) {
                onError(new Error("No se pudo interpretar el JSON recibido."));
            }
        } else {
            onError(new Error(`Error HTTP ${xhr.status}: ${xhr.statusText}`));
        }
    };
    
    xhr.onerror = function () {
        onError(new Error("Error de red o conexión perdida."));
    };
    
    xhr.ontimeout = function () {
        onError(new Error("Tiempo de espera agotado."));
    };
    
    xhr.send();
}