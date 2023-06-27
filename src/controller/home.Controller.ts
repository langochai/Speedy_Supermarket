import {User} from '../schemas/user.schemas/user.model';
import {Cart} from '../schemas/user.schemas/cart.model';
import {Product} from "../schemas/product.schemas/product.model";
import {Category} from "../schemas/product.schemas/category.model";
import {Status} from "../schemas/product.schemas/status.model";

export class HomeController {
    static async showHome(req: any, res: any) {
        if (req.user) {
            req.user = await User.findById(req.user._id)
                .populate({path: 'cart', select: 'detail purchased -_id', model: Cart});
            if (req.user.role === "admin") return res.redirect("/admin")
        }
        let username = '';
        if (req.user) username = req.user.username;
        let productList = await Product
            .find()
            .populate('category', 'name', Category)
            .populate('status', 'name', Status);
        let productDiscountList = productList.filter(product=>{
            for (let i = 0; i < product.status.length; i++) {
                // @ts-ignore
                if(product.status[i].name==="discount") return product
            }
        })
        let productTrendingList = productList.filter(product=>{
            for (let i = 0; i < product.status.length; i++) {
                // @ts-ignore
                if(product.status[i].name==="trending") return product
            }
        })
        let numberOfCarousel = 6
        let productRandomList = HomeController.getRandomProduct(productList,numberOfCarousel)
        res.render("index", {username,productList,productDiscountList,productTrendingList,productRandomList});
    }
    static getRandomProduct(arr:any[],count:number){
        let shuffled = arr.slice(0);
        let i = arr.length;
        let min = i - count;
        let temp: any;
        let index: number;

        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }

        return shuffled.slice(min);
    }
}