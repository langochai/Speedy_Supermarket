import {Product} from "../../schemas/product.schemas/product.model";
import {Category} from "../../schemas/product.schemas/category.model";
import {Status} from "../../schemas/product.schemas/status.model";
export class AdminManagement {
    static async showAdminHomePage(req, res){
        let productList = await Product
            .find()
            .populate('category','name',Category)
            .populate('status','name',Status);
        res.render('admin/adminHomePage.ejs',{productList:productList})
    }
    static async adminAddProduct(req,res){
        res.render('admin/adminAddProduct.ejs')
    }
}