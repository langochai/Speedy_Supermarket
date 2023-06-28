import { Cart } from "../../schemas/user.schemas/cart.model";
import { User } from "../../schemas/user.schemas/user.model";
import { Product } from "../../schemas/product.schemas/product.model";


async function getCart(user_id, purchased: boolean) {
    const userCart = await User.findById(user_id).populate({ path: 'cart', model: Cart });
    //@ts-ignore
    let userCartFilter = userCart.cart.filter(item => item.purchased === purchased)
    return userCartFilter; //! trả về một mảng các cart có trạng thái 

}

async function getProductList(user_id) {
    // const userId = user_id; // Replace USER_ID with the actual ID of the user
    // const userCart = await User.findById(userId).populate({path: 'cart', model: Cart}); //! cần check xem cart đã thanh toán chưa. Lấy ra 

    //! lấy danh sách cart chưa thanh toán
    const userCart = await getCart(user_id, false);
    //@ts-ignore
    const detail = userCart[0].detail
    let arrProduct = detail.map(item => item.product);
    console.log(arrProduct);
    let productList = await Product.find({ _id: { $in: arrProduct } })
    console.log(productList); //! lấy ra được 1 mảng các product trong cart để hiển thị lên view
    return productList;
}

async function productForCart(user_id, request) {
    let product_id = "64991567ed2bb8ab40e44616"; //! id của sản phẩm trong cart, id sẽ lấy từ param
    // let product_id = request.param; 
    let userCartUnPaid = await getCart(user_id, false); //! lấy cart chưa thanh toán, có duy nhất 1 cart

    //! check request
    switch (request.method) {
        case "GET":
            //! test tạm ở phương thức get
            //@ts-ignore
            const detail = userCartUnPaid[0].detail
            const index = detail.findIndex(obj => obj.product == product_id);
            //! chức năng cho PUT
            //    if (index !== -1) {
            //     console.log(`ID  đã được tìm thấy trong mảng`);
            //     //@ts-ignore
            // //! lấy ra số lượng của product
            //    await Cart.findOneAndUpdate({_id: userCartUnPaid[0]._id},
            //     { $inc: { [`detail.${index}.productQuantity`]: 1 }}, //! tăng sản phẩm hiện tại lên 1 nếu tìm thấy trong giỏ hảng
            //     { new: true } 
            //      ).then((updatedCart) => {
            //         console.log(updatedCart,123);
            //       })
            //       .catch((error) => {
            //         console.log(error);
            //       });

            //   } else {
            //     console.log(`ID  không tìm thấy trong mảng`);
            //     let newProduct = {
            //         product : product_id,
            //         productQuantity : 1,
            //     }
            //     //@ts-ignore
            //     await Cart.findById({_id: userCartUnPaid[0]._id})
            //         .then((cart) => {
            //             cart.detail.push(newProduct); // Sử dụng push() để thêm đối tượng vào mảng

            //             cart.save(); //! Lưu sản phẩm mới thành công
            //         })
            //   };
            //! chức năng cho DELETE
            if (index !== -1) {
                console.log(`ID  đã được tìm thấy trong mảng`); //! đối tượng product có tồn tại
                //@ts-ignore
                //! lấy ra số lượng của product

                await Cart.findById({ _id: userCartUnPaid[0]._id })
                    .then((cart) => {
                        console.log(cart);
                        //@ts-ignore

                        const child = cart.detail.find(child => child.product == product_id);
                        console.log(child);

                        //@ts-ignore
                        cart.detail.pull(child); // Sử dụng push() để thêm đối tượng vào mảng
                        console.log("đã xóa thành công");

                        cart.save(); //! Lưu sản phẩm mới thành công
                    })

            } else {
                console.log(`ID  không tìm thấy trong mảng`);

            };




            break;
        case "PUT": //! cập nhật lại Detail trong Cart (thêm sản phẩm mới, tăng số lượng or giảm số lượng sản phẩm đã tồn tại)
            //! thêm sản phẩm mới: check xem đã có trong cart chưa. Nếu có tăng só lượng đang có lên 1. Nếu không thêm mới với số lượng là 1

            break;
        case "DELETE":

            break;
        default:
            break;
    }
}

async function changeProductQuantity(user_id, request, inOrDe) { //! inOrDe là tăng or giảm
    let product_id = "64991567ed2bb8ab40e44615"; //! id của sản phẩm trong cart, id sẽ lấy từ param
    // let product_id = request.param; 
    let userCartUnPaid = await getCart(user_id, false); //! lấy cart chưa thanh toán, có duy nhất 1 cart
    console.log(typeof inOrDe);
    let test;
    if(inOrDe == "true") {
        test = 1; //! giả sử là tăng
    } else {
        test = -1; //giảm
    }
    console.log(test);
    
    //@ts-ignore
    const detail = userCartUnPaid[0].detail
    const index = detail.findIndex(obj => obj.product == product_id);
    if (index !== -1) {
        console.log(`ID  đã được tìm thấy trong mảng`);
        //@ts-ignore
        //! lấy ra số lượng của product
        await Cart.findOneAndUpdate({ _id: userCartUnPaid[0]._id },
            { $inc: { [`detail.${index}.productQuantity`]: test } }, //! tăng sản phẩm hiện tại lên 1 nếu tìm thấy trong giỏ hảng
            { new: true }
        ).then((updatedCart) => {
            console.log(updatedCart, 123);
        })
            .catch((error) => {
                console.log(error);
            });

    } else {
        console.log(`ID  không tìm thấy trong mảng`);

    };


}

async function purchase(cart_id) {
    // await Cart.findById({ _id: cart_id })
    //                 .then((cart) => {
    //                     console.log("đã tìm thây cart");
                        
    //                     console.log(cart,123);
    //                     // console.log(cart);
                        
    //                     //@ts-ignore
    //                     const newPurchased = true;
    //                     cart.purchased
    //                     // const child = cart.detail.find(child => child.product == product_id);
    //                     // console.log(child);

    //                     // //@ts-ignore
    //                     // cart.detail.pull(child); // Sử dụng push() để thêm đối tượng vào mảng
    //                     // console.log("đã xóa thành công");

    //                     // cart.save(); //! Lưu sản phẩm mới thành công
    //                 })
    //                 .catch(err => console.log("khong tim thay cart"))
    console.log(typeof cart_id);
    console.log(cart_id);
    
    
    try {
        const cart = await Cart.findOne({ _id: cart_id });
    if (cart) {
      console.log('Cart found');
      await Cart.updateOne(
        { _id: cart_id },
        { $set: { purchased: true } },
        { upsert: false }
     )
    } else {
      console.log('Cart not found');
    }
      } catch (error) {
        console.error('Error occurred:', error);
        console.log("Id cart không đúng định dạng");
        
      }
    
}


export class CartController {
    static async showCart(req, res) {
        getProductList('649900d7bb759754879c9d38') //! user_id
    }
    static async addProductToCart(req, res) {
        productForCart('649900d7bb759754879c9d38', req)

    }
    static async changeProductQuantity(req, res) {
        changeProductQuantity('649900d7bb759754879c9d38', req, req.params.check)
    }

    static async purchase(req, res) {
        purchase(req.params.cartID)
    }
}
