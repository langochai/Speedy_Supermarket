import { User } from '../schemas/user.schemas/user.model';
import { Cart } from '../schemas/user.schemas/cart.model';

export class HomeController {
    static async showHome(req: any, res: any) {
        req.user = await User.findById(req.user._id)
            .populate({ path: 'cart', select: 'detail purchased -_id', model: Cart });
        console.log(req.user);
        res.render("index");
    }
}