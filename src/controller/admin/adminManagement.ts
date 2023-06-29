import { Status } from './../../schemas/product.schemas/status.model';
import { User } from './../../schemas/user.schemas/user.model';
import {Product} from "../../schemas/product.schemas/product.model";
import {Category} from "../../schemas/product.schemas/category.model";
import * as fs from "fs";
import path from "path";

export class AdminManagement {
    static async showAdminHomePage(req, res) {
        let username = req.user.username
        let search = await AdminManagement.adminSearchProduct(req, res)
        let productList = await Product
            .find(search)
            .populate('category', 'name', Category)
            .populate('status', 'name', Status);
            productList.reverse()
            let categories = await Category.find();
            let statuses = await Status.find();
            
        res.render('admin/adminHomePage.ejs', {productList,username,categories,statuses})
    }

    static async postAdminAddProduct(req, res) {
        let {productName, price, quantity, discount, image, category, status} = req.body
        let newCategory = []
        let newStatus = []
        if (typeof category == typeof "") {
            let cate = await Category.findOne({name: category})
            if (cate._id) newCategory.push(cate._id)
        } else if (category) {
            for (const cate of category) {
                let cateEach = await Category.findOne({name: cate})
                newCategory.push(cateEach._id)
            }
        }
        if (typeof status == typeof "") {
            let stat = await Status.findOne({name: status})
            if (stat._id) newStatus.push(stat._id)
        } else if (status) {
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
            image:image,
            category: newCategory,
            status: newStatus
        }
        
        let addProduct = new Product(newProduct);
        await addProduct.save()
        res.redirect('/admin')
    }

    static async getAdminUpdateProduct(req, res) {
        let id = req.params.id;
        let product:any = await Product
            .findById(id)
            .populate('category', {name: 1, _id: 0}, Category)
            .populate('status', {name: 1, _id: 0}, Status)
            .catch(err=>{
                if(err) res.redirect("/admin")
            });
        let {category, status} = product;
        let categoryList = await Category.find({}, {name: 1, _id: 0});
        let categoryFilter = categoryList.filter(item => {
            let flag = true
            for (let cate of category) {
                // @ts-ignore
                if (item.name === cate.name) flag = false
            }
            if (flag) return item
        });
        let statusList = await Status.find({}, {name: 1, _id: 0});
        let statusFilter = statusList.filter(item => {
            let flag = true
            for (let stat of status) {
                // @ts-ignore
                if (item.name === stat.name) flag = false
            }
            if (flag) return item
        });
        // res.render('admin/adminUpdateProduct', {product, category, categoryFilter, status, statusFilter});
        res.json(product)
    }

    static async postAdminUpdateProduct(req, res) {
        let product = await Product
            .findById(req.params.id)
            .populate('category', {name: 1, _id: 0}, Category)
            .populate('status', {name: 1, _id: 0}, Status);  
        let {productName, price, quantity, discount} = req.body;
        let {image, category, status} = product;

        let newName = productName === "" ? product.name : productName;
        let newPrice = price === "" ? product.price : price
        let newQuantity = quantity === "" ? product.quantity : quantity
        let newDiscount = discount === "" ? product.discount : discount
        let newImage = req.file ? "uploads/" + newName + newPrice + req.file.originalname : image;

        let newCategory = req.body.category ? req.body.category : category;
        let newStatus = req.body.status ? req.body.status : status;
        let categoryList = []
        let statusList = []
        if (typeof newCategory === typeof "") {
            let cate = await Category.findOne({name: newCategory})
            if (cate._id) categoryList.push(cate._id)
        } else {
            for (const cate of newCategory) {
                let cateEach = await Category.findOne({name: cate})
                categoryList.push(cateEach._id)
            }
        }
        if (typeof newStatus == typeof "") {
            let stat = await Status.findOne({name: newStatus})
            if (stat._id) statusList.push(stat._id)
        } else {
            for (const stat of newStatus) {
                let statEach = await Status.findOne({name: stat})
                statusList.push(statEach._id)
            }
        }

        let updatedProduct = {
            name: newName,
            price: +newPrice,
            quantity: +newQuantity,
            discount: +newDiscount,
            image: newImage,
            category: categoryList,
            status: statusList
        };
        await Product.updateOne({_id: product._id}, updatedProduct).catch(err=>{
            if(err) console.log(err.message);
        })
        res.redirect('/admin');
    }
    static async getAdminDeleteProduct(req,res){
        let id = req.params.id;
        await Product.deleteOne({_id:id})
        res.redirect("/admin")
    }

    static async adminSearchProduct(req, res) {
        let queryName = {}
        if (req.query.search) {
            let search = req.query.search
            queryName = {
                name: {
                    $regex: search
                }
            }
        }
        return queryName;
    }
}