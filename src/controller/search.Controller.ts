import { Product } from "../schemas/product.schemas/product.model";
export class SearchController {
    static async productsSearch(nameSearch) {
        let product = await Product.findOne({
            name: nameSearch
        })
    }

    static productSearch(req: any, res: any) {
        let productName = req.params.name;
        let products = this.productsSearch(productName);
        res.status(200).json(products)
    }
}  