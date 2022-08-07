const productSeller = require('../models/productSeller');
const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const {LIMIT_DATA} = process.env;

exports.createProduct = (req,res) =>{
  console.log(req.body);
  console.log(req.files);
  const sellerId= req.authUser.id;
  let photo1 = null;
  let photo2 = null;
  let photo3 = null;
  let photo4 = null;
  let photo5 = null;
  if(req.files){
    req.files[0]!==undefined?photo1 = req.files[0].filename:photo1 = null;
    req.files[1]!==undefined?photo2 = req.files[1].filename:photo2 = null;
    req.files[2]!==undefined?photo3 = req.files[2].filename:photo3 = null;
    req.files[3]!==undefined?photo4 = req.files[3].filename:photo4 = null;
    req.files[4]!==undefined?photo5 = req.files[4].filename:photo5 = null;
  }
  productSeller.createProductModel(req.body,photo1,photo2,photo3,photo4,photo5,sellerId,(err,result)=>{
    if(err){
      console.log(err);
      return errorResponse(err,res);
    }else{
      return response(res,'Product Added',result);
    }
  });
};

exports.editProduct = (req,res) => {
  const sellerId= req.authUser.id;
  let photo1 = null;
  let photo2 = null;
  let photo3 = null;
  let photo4 = null;
  let photo5 = null;
  req.files[0]?photo1 = req.files[0].filename:photo1 = null;
  req.files[1]?photo2 = req.files[1].filename:photo2 = null;
  req.files[2]?photo3 = req.files[2].filename:photo3 = null;
  req.files[3]?photo4 = req.files[3].filename:photo4 = null;
  req.files[4]?photo5 = req.files[4].filename:photo5 = null;
  productSeller.editProductModel(req.body.id,sellerId,req.body,photo1,photo2,photo3,photo4,photo5,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    return response(res,'Product Edited', result.rows[0]);
  });
};

exports.showAllProduct = (req,res)=>{
  const {searchBy='name_product',search='',sortBy='product_id',sort='DESC',limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const offset = (page-1) * limit;
  productSeller.showAllProductModel(searchBy,search,sortBy,sort,limit,offset,(err,result)=>{
    if(err){
      console.log(err);
      return errorResponse(err);
    }
    const pageInfo = {};
    productSeller.countAllProductsModel(searchBy,search,(err,totalusers)=>{
      pageInfo.totalData = totalusers;
      pageInfo.totalPage = Math.ceil(totalusers/limit);
      pageInfo.curretPage = parseInt(page);
      pageInfo.nextPage = pageInfo.curretPage < pageInfo.totalPage? pageInfo.curretPage+1:null;
      pageInfo.prevPage = pageInfo.curretPage > 1 ? pageInfo.curretPage-1:null;
      return response(res,'Showing History',result.rows,pageInfo);
    });
  });
};

exports.showProductStore = (req,res) => {
  const sellerId= req.authUser.id;
  const {searchBy='name_product',search='',sortBy='product_id',sort='DESC',limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const offset = (page-1) * limit;
  productSeller.showProductModel(sellerId,searchBy,search,sortBy,sort,limit,offset,(err,result)=>{
    if(err){
      console.log(err);
      return errorResponse(err,res);
    }
    const pageInfo = {};
    productSeller.countAllProductSellerModel(sellerId,searchBy,search,(err,totalusers)=>{
      pageInfo.totalData = totalusers;
      pageInfo.totalPage = Math.ceil(totalusers/limit);
      pageInfo.curretPage = parseInt(page);
      pageInfo.nextPage = pageInfo.curretPage < pageInfo.totalPage? pageInfo.curretPage+1:null;
      pageInfo.prevPage = pageInfo.curretPage > 1 ? pageInfo.curretPage-1:null;
      return response(res,'Showing History',result.rows,pageInfo);
    });
  });
};

exports.addVariant = (req,res)=>{
  productSeller.addVarianModel(req.body.id,req.body,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    const variant = result.rows[0];
    productSeller.addSizeModel(variant.id,req.body.name,req.body.stock,(err)=>{
      if(err){
        errorResponse(err,res);
      }else{
        return response(res,'Variant Added');
      }
    });
  });
};

exports.addSizeAndStock = (req,res)=>{
  productSeller.getSizeModel(req.body.variant_id,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }if(result.rowCount<1){
      return response(res,'id Not Found',null,null,400);
    }
    const size = result.rows[0];
    console.log(size);
    console.log(req.body);
    if(size.name===req.body.name&&size.variant_id==req.body.variant_id){
      productSeller.updateStock(req.body.variant_id,req.body,(err,result)=>{
        if(err){
          return errorResponse(err,res);
        }
        return response(res,'Stock Updated',result.rows[0]);
      });
    }else{
      productSeller.addSizeModel(req.body.variant_id,req.body.name,req.body.stock,(err,result)=>{
        if(err){
          return errorResponse(err,res);
        }
        return response(res,'Size and Stock Updated',result.rows);
      });
    }
  });
};

exports.deleteProduct=(req,res)=>{
  productSeller.deleteProductModel(req.params.id,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount<1){
      return response(res,'id Not Found or Deleted',null,null,400);
    }else{
      return response(res,'Success Delete Product',result.rows[0]);
    }
  });
};