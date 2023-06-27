import {Product} from "../../schemas/product.schemas/product.model";
import {Category} from "../../schemas/product.schemas/category.model";
import {Status} from "../../schemas/product.schemas/status.model";

export class UserManagement {
    static async showUserHomePage(req, res) {
        let search = await UserManagement.userSearchProduct(req, res)
        let productList = await Product
            .find(search)
            .populate('category', 'name', Category)
            .populate('status', 'name', Status);
            console.log(productList);

        res.render('index', {productList: productList})
    }

    static async getUserAddProduct(req, res) {
        res.render('index')
    }

    static async postUserAddProduct(req, res) {
        let {productName, price, quantity, discount, category, status} = req.body
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
            image: 'uploads/' + productName + price + req.file.originalname,
            category: newCategory,
            status: newStatus
        }
        let addProduct = new Product(newProduct);
        await addProduct.save()
        res.redirect('/index')
    }

    static async userSearchProduct(req, res) {
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