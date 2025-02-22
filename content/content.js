console.log("Extracting product details for carbon footprint calculation...");

// Extract product name
let productTitle = document.querySelector(".pdp-e-i-head, .pdp-title")?.innerText.trim() || "Title not found";

// Extract weight, dimensions, and material
let weight = "Not found";
let dimensions = "Not found";
let material = "Not found";
let countryOfOrigin = "Not found";
let certifications = "Not found";
let energyConsumption = "Not found";

// Search for specifications table
let specRows = document.querySelectorAll(".spec-row, .product-specs-row");
if (specRows.length > 0) {
    specRows.forEach(row => {
        let label = row.querySelector(".specsKey, .spec-title")?.innerText.trim().toLowerCase();
        let value = row.querySelector(".specsValue, .spec-detail")?.innerText.trim();

        if (label.includes("weight")) weight = value;
        if (label.includes("dimension") || label.includes("size")) dimensions = value;
        if (label.includes("material")) material = value;
        if (label.includes("origin") || label.includes("country")) countryOfOrigin = value;
        if (label.includes("certification") || label.includes("eco")) certifications = value;
        if (label.includes("power") || label.includes("energy")) energyConsumption = value;
    });
}

// Log extracted data
let productData = {
    title: productTitle,
    material: material,
    weight: weight,
    dimensions: dimensions,
    countryOfOrigin: countryOfOrigin,
    certifications: certifications,
    energyConsumption: energyConsumption,
    url: window.location.href
};

console.log("Extracted Product Data:", productData);

// Send data to background script
if (chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage(productData, (response) => {
        if (chrome.runtime.lastError) {
            console.warn("Could not send message to background:", chrome.runtime.lastError);
        } else {
            console.log("Product data sent successfully:", response);
        }
    });
} else {
    console.warn("Background script not available.");
}
