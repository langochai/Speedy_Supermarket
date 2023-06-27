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
    let product_id = "64991567ed2bb8ab40e44613";
    // let product_id = request.param;
    let userCartUnPaid = await getCart(user_id, false);
   
    
    
    
    //! check request
    switch (request.method) {
        case "GET":
            //! test tạm ở phương thức get
            const userCart = await getCart(user_id, false);
            //@ts-ignore
           const detail = userCart[0].detail
           const index = detail.findIndex(obj => obj.product == product_id);
           if (index !== -1) {
            console.log(`ID  đã được tìm thấy trong mảng`);
            //@ts-ignore

        //    await Cart.updateOne({_id: userCartUnPaid[0]._id}, {})

          } else {
            console.log(`ID  không tìm thấy trong mảng`);
          }
           
           console.log(detail);
           
          


                    
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

export class CartController {
    static async showCart(req, res) {
        getProductList('649900d7bb759754879c9d38') //! user_id
    }
    static async addProductToCart(req, res) {
        productForCart('649900d7bb759754879c9d38',req)

    }
}