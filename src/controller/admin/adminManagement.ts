import {Product} from "../../schemas/product.schemas/product.model";
import {Category} from "../../schemas/product.schemas/category.model";
import {Status} from "../../schemas/product.schemas/status.model";

export class AdminManagement {
    static async showAdminHomePage(req, res) {
        let productList = await Product
            .find()
            .populate('category', 'name', Category)
            .populate('status', 'name', Status);
        res.render('admin/adminHomePage.ejs', {productList: productList})
    }

    static async getAdminAddProduct(req, res) {
        res.render('admin/adminAddProduct.ejs')
    }

    static async postAdminAddProduct(req, res) {
        let {productName, price, quantity, discount, category, status} = req.body
        let newCategory = []
        let newStatus = []
        if (typeof category == typeof "") {
                let cate = await Category.findOne({name: category})
                if (cate._id) newCategory.push(cate._id)
        } else {
            for (const cate of category) {
                let cateEach = await Category.findOne({name: cate})
                newCategory.push(cateEach._id)
            }
        }
        if (typeof status == typeof "") {
                let stat = await Status.findOne({name: status})
                if (stat._id) newStatus.push(stat._id)
        } else {
            for (const stat of status) {
                let statEach = await Status.findOne({name: stat})
                newStatus.push(statEach._id)
            }
        }
        let newProduct = {
            name: productName,
            price: +price,
            quantity: +quantity,
            discount: +discount,
            image: 'uploads/' + productName + price + req.file.originalname,
            category: newCategory,
            status: newStatus
        }
        let addProduct = new Product(newProduct);
        await addProduct.save()
        res.redirect('/admin')
    }
    static async getAdminUpdateProduct(req,res){
        let id = req.params.id;
        let product = await Product
            .findById(id)
            .populate('category', {name:1,_id:0}, Category)
            .populate('status', {name:1,_id:0}, Status);
        let {category,status} = product;
        let categoryList = await Category.find({},{name:1,_id:0});
        let categoryFilter = categoryList.filter(item=> {
            for (let cate of category){
                // @ts-ignore
                if(cate.name!==item.name) return item
            }
        });
        let statusList = await Status.find({},{name:1,_id:0});
        let statusFilter = statusList.filter(item=> {
            for (let stat of status){
                // @ts-ignore
                if(stat.name!==item.name) return item
            }
        });
        res.render('admin/adminUpdateProduct',{product,category,categoryFilter,status,statusFilter});
    }
    static async postAdminUpdateProduct(req,res){
        console.log(req.body)
        console.log(req.file)
        let product = await Product
            .findById(req.params.id)
            .populate('category', {name:1,_id:0}, Category)
            .populate('status', {name:1,_id:0}, Status);
        console.log(product)
        res.redirect('/admin')
    }
}