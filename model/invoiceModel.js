const mongoose = require('mongoose');


const invoiceSchema = new mongoose.Schema({
    currency: {
            type: String ,
            default:'INR'
        },
    taxNotation:{
            type: String ,
            default:'vat'
        }, 
     marginTop: {
            type: Number,
            default:25 
        },
    marginRight: {
            type: Number ,
            default:25
        },
    marginLeft: {
            type: Number,
            default:25 
        },
    marginBottom:{
            type: Number,
            default:25
        },
    logo: {
            type: String ,
            default: "https://public.easyinvoice.cloud/img/logo_en_original.png"
        },
    background: {
            type: String ,
            default: "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
        }, 
    sender: {
            company: {
                type: String,
                required :'This field is required.' 
            },
            address: {
                type: String 
            },
            zip: {
                type: String 
            },
            city: {
                type: String 
            },
            country: {
                type: String 
            },
        },
    client: {
               company: {
                type: String ,
                required :'This field is required.'
            },
               address: {
                type: String 
            },
               zip: {
                type: String 
            },
               city: {
                type: String 
            },
               country: {
                type: String 
            },
        },
    invoiceNumber: {
            type: String ,
            required :'This field is required.'
        },
    invoiceDate: {
            type: String 
        },
    bottomNotice: {
            type: String ,
            default:"Kindly pay your invoice within 15 days."
        }       
});


const invoice = mongoose.model('invoice',invoiceSchema)

module.exports = invoice


