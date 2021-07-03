
const express = require("express");
//const invoice = require("../models/invoiceModel.js");
const invoiceModel = require("../models/invoiceModel.js");
//const product = require("../models/productModel.js");
const productModel = require("../models/productModel.js");
var easyinvoice = require('easyinvoice');
var fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {

    invoiceModel.find((err, invoiceData) => {
        if (!err) {
            productModel.find((err, productData) => {
                if (!err) {
                    res.render("invoice", {
                        viewTitle: "Invoices",
                        invoice: invoiceData,
                        product: productData,
                        count: 0
                    });
                }
                else {
                    console.log('Error in retrieving employee list :' + err);
                }
            }).lean()
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    }).lean();


});


router.get('/addinvoice', (req, res) => {
    res.render("addinvoice", {
        viewTitle: "Enter Invoice"
    });
});
router.post('/addinvoice', (req, res) => {
    insertInvoice(req, res);
    res.render("addinvoice", {
        viewTitle: "Enter Invoice"
    });
});

router.get('/:id', (req, res) => {
    getInvoice(req, res);
});


function insertInvoice(req, res) {
    invoice = new invoiceModel();
    product = new productModel();
    product.invoiceNumber = req.body.invoiceNumber;
    product.quantity = req.body.quantity;
    product.description = req.body.description;
    product.tax = req.body.tax;
    product.price = req.body.price;
    product.save((err, dec) => {
        if (!err) {
            console.log("data inserted.", product);
        }
        else {
            console.log('Something went wrong');
        }
    });


    invoice.sender.company = req.body.sender_company
    invoice.sender.address = req.body.sender_address
    invoice.sender.zip = req.body.sender_zip
    invoice.sender.city = req.body.sender_city
    invoice.sender.country = req.body.sender_country
    invoice.client.company = req.body.client_company
    invoice.client.address = req.body.client_address
    invoice.client.zip = req.body.client_zip
    invoice.client.city = req.body.client_city
    invoice.client.country = req.body.client_country
    invoice.invoiceNumber = req.body.invoiceNumber
    invoice.invoiceDate = req.body.invoiceDate
    invoice.save((err, dec) => {
        if (!err) {
            console.log("data inserted.", invoice);
        }
        else {
            console.log('Something went wrong');
        }
    });

}

function  getInvoice(req, res) {
   var product;
   var invoice;
   var count=0;
    // Employee.findById(req.params.id, (err, doc) => {
    //     if (!err) {
    //         res.render("employee/addOrEdit", {
    //             viewTitle: "Update Employee",
    //             employee: doc
    //         });
    //     }
    // });
  let tag = req.params.id;
  let str = tag.toString();
  console.log(tag ,str);
    invoiceModel.findOne({ 'invoiceNumber':str}, (err,one) => {
        invoice = one
        if (!err) {
            productModel.findOne({ 'invoiceNumber':str}, (err,two) => {
                if (!err) {
                   product = two;
                    // var data = {
                    //     "currency": "INR",
                    //     "taxNotation": "vat",
                    //     "marginTop": 25,
                    //     "marginRight": 25,
                    //     "marginLeft": 25,
                    //     "marginBottom": 25,
                    //     "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
                    //     "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
                    //     "sender": {
                    //         "company":invoice.sender.company,
                    //         "address":invoice.sender.address,
                    //         "zip":invoice.sender.zip,
                    //         "city":invoice.sender.city,
                    //         "country":invoice.sender.country
                    //     },
                    //     "client": {
                    //         "company":invoice.client.company,
                    //         "address":invoice.client.address,
                    //         "zip":invoice.client.zip,
                    //         "city":invoice.client.city,
                    //         "country":invoice.client.country
                    //     },
                    //     "invoiceNumber": invoice.invoiceNumber,
                    //     "invoiceDate": invoice.invoiceDate,
                    //     "products": [
                    //         {
                    //             "quantity": product.quantity,
                    //             "description": product.description,
                    //             "tax": product.tax,
                    //             "price": product.price
                    //         },
                    //     ],
                    //     "bottomNotice": invoice.bottomNotice,
                
                    // };
                    res.render("invoice", {
                        viewTitle: "Invoices",
                        invoice,
                        product
                    });

                }else{
                    console.log("something went wrong");
                }
            });
        }else{
            console.log("something went wrong");  
        }
    });
   setTimeout(()=>{
    console.log(invoice.client.company);
    var data = {
        "currency": "INR",
        "taxNotation": "vat",
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
        "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
        "sender": {
            "company":invoice.sender.company,
            "address":invoice.sender.address,
            "zip":invoice.sender.zip,
            "city":invoice.sender.city,
            "country":invoice.sender.country
        },
        "client": {
            "company":invoice.client.company,
            "address":invoice.client.address,
            "zip":invoice.client.zip,
            "city":invoice.client.city,
            "country":invoice.client.country
        },
        "invoiceNumber": invoice.invoiceNumber,
        "invoiceDate": invoice.invoiceDate,
        "products": [
            {
                "quantity": product.quantity,
                "description": product.description,
                "tax": product.tax,
                "price": product.price
            },
        ],
        "bottomNotice": invoice.bottomNotice,

    };
easyinvoice.createInvoice(data, async function (result) {
    await fs.writeFileSync("invoice"+count+".pdf", result.pdf, 'base64');
    count++;
});
    // const result = await easyinvoice.createInvoice(data);                       
     
    // easyinvoice.createInvoice(data,function (result){
    //     console.log(result.pdf);
    //     easyinvoice.download("invoice.pdf", result.pdf);
    // });

   },5000) ;
    
    
}

module.exports = router;