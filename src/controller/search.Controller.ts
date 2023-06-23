import { Product } from "../schemas/product.schemas/product.model";
export class SearchController {
    static async productsSearch(req: any, res: any) {
        // let query={
        let nameSearch = req.query.name // ||""
        let product = await Product.findOne({
            name: "Hot"
        })
    }
}