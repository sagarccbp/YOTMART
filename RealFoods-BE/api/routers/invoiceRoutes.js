const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const easyinvoice = require('easyinvoice');
const isAdmin = require("../../middleware/is-admin");

router.post("/create-invoice",isAdmin, async (req, res, next) => {
    const clientDetails = {
        company: req.body.companyDetails.name | 'Prasad',
        address: req.body.companyDetails.address | 'Golikatta',
        zip: req.body.companyDetails.zip | '581318',
        city: req.body.companyDetails.city | 'Sirsi',
        country: req.body.companyDetails.country | 'India'
    }
    const information = {
        number: req.body.information.invoiceNum | "10000",
        date: req.body.information.invoiceDate | "15-02-2023"
    }
    const products = req.body.products;

    var data = {
        "images": {
            // The logo on top of your invoice
            "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
            // The invoice background
            "background": "https://public.easyinvoice.cloud/img/logo_en_original.png"
        },
        "sender": {
            "company": "Real Foods Corp.",
            "address": "Sample Street 123",
            "zip": "1234 AB",
            "city": "Pondicherry",
            "country": "INDIA",
            "custom1": "Pondicherry"
        },
        "client": clientDetails,
        "information": information,
        "products": products,
        "bottom-notice": "Incase of any confusion on billing, please feel free to contact us",
        "settings": {
            "currency": "INR",
        }
    }
    
    easyinvoice.createInvoice(data, function (result) {
        return res.status(200).json(result);
    });
        
})

module.exports = router;