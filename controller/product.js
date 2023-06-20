const Product = require('../models/product')


const getAllProducts = async(req, res)=>{

    const {company , name ,featured , sort ,select} = req.query;
    const queryObject = {}
    

    if(company){
        queryObject.company = company //strictly search
        
    }
    if(name){
        queryObject.name = {$regex: name , $options:"i"} //case insensitive
        console.log(queryObject);
    }
    if(featured){
        queryObject.featured = featured
    }
    let apiData = Product.find(queryObject)

    if(sort){
        // let sortFix = sort.replace("," , " ")
        let sortFix = sort.split(",").join(" ")
        apiData = apiData.sort(sortFix)
    }
    if(select){
        let selectFix = select.split(",").join(" ")
        apiData = apiData.select(selectFix)
    }

    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 3

    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit)
 

    // const myData = await Product.find(queryObject) //befoure Shorting
    const Products = await apiData
    res.status(200).json({Products ,"length":Products.length})
}

const getAllProductsTesting = async(req, res)=>{

    const Products = await Product.find(req.query)

    res.status(200).json({Products ,"length":Products.length})
}

const guestDeatails = async(req, res)=>{
    const guests = await Guest.find(req.query)
}

module.exports ={getAllProducts,getAllProductsTesting}