import { Cart } from "../../schemas/user.schemas/cart.model";
import { User } from "../../schemas/user.schemas/user.model";
import { Product } from "../../schemas/product.schemas/product.model";

async function getCartByUserAndPurchaseStatus(user_id, purchased: boolean) {
    try {
        const userCart = await User.findById(user_id).populate({ path: 'cart', model: Cart });
        //@ts-ignore
        let userCartFilter = userCart.cart.filter(item => item.purchased === purchased)
        return userCartFilter;
    } catch (error) {
        console.log(error);
    }
}
async function getProductListInCart(user_id) {
    const userCartUnpaid = await getCartByUserAndPurchaseStatus(user_id, false);
    //@ts-ignore
    const detail = userCartUnpaid[0].detail
    let arrProduct = detail.map(item => item.product);
    let productList;
    //@ts-ignore
    await Product.find({ _id: { $in: arrProduct } })
        .lean()
        .then(function (results) {
            // Thực hiện các thay đổi trên kết quả
            results.forEach(function (result) {
                detail.forEach((element) => {
                    if (element.product.toString() == result._id.toString()) {
                        //@ts-ignore
                        result.productQuantity = element.productQuantity;
                    }
                });
            });
            productList = results;
        })
        .catch(function (err) {
            console.error(err);
        });
    return productList;
}

async function productForCart(user_id, productId, request) {
    let product_id = productId; 
    let userCartUnPaid = await getCartByUserAndPurchaseStatus(user_id, false);
    //@ts-ignore
    const detail = userCartUnPaid[0].detail
    const index = detail.findIndex(obj => obj.product == product_id);
    if ('id' in request.params) {
        if (index !== -1) {
            //@ts-ignore
            await Cart.findOneAndUpdate({ _id: userCartUnPaid[0]._id },
                { $inc: { [`detail.${index}.productQuantity`]: 1 } }, 
                { new: true }
            ).then((updatedCart) => {
            })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            let newProduct = {
                product: product_id,
                productQuantity: 1,
            }
            //@ts-ignore
            await Cart.findById({ _id: userCartUnPaid[0]._id })
                .then((cart) => {
                    cart.detail.push(newProduct);
                    cart.save();
                })
        };
    } else if ('idDelete' in request.params) {
        if (index !== -1) {
            //@ts-ignore
             await Cart.findById({ _id: userCartUnPaid[0]._id })
                .then((cart) => {
                    //@ts-ignore
                    const child = cart.detail.find(child => child.product == product_id);
                    //@ts-ignore
                    cart.detail.pull(child);;
                    cart.save(); 
                })
        };
    }
}
export class CartController {
    static async showCart(req, res) {
        try {
            let productList = await getProductListInCart(req.user._id)
            res.render('cart/cart', { productList });
        } catch (error) {
            console.log(error);
            res.redirect('/home')
        }
    }
    static async addProductToCart(req, res) {
        try {
            if (req.params.id) {
                await productForCart(req.user._id, req.params.id, req)
                res.redirect('/home');
            } else if (req.params.idDelete) {
                await productForCart(req.user._id, req.params.idDelete, req)
                res.redirect('/cart');
            }
        } catch (error) {
            console.log(error);
            res.redirect('/home')
        }
    }
}
