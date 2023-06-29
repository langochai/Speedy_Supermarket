import { User } from '../../schemas/user.schemas/user.model';
import { Cart } from '../../schemas/user.schemas/cart.model';
export class AdminShowUserList {
    static async showUser(req, res) {
        const users = await User.find().populate({ path: 'cart', model: Cart });
        res.render('admin/adminUserList', { users });
    }
    static async showCart(req, res) {
        const userId = req.params.id
        const user = await User.findById(userId).populate({ path: 'cart', model: Cart });
        
    }
    static async search(req, res) {
        const user = await User.findOne({username: req.body.adminSearch});
        res.render('admin/adminUserList', { user });
    }

    static async updateRole(req, res) {
        const userId = req.query.id;
        const userRole = req.params.role;
        await User.updateOne({ _id: userId }, { role: userRole });
        res.redirect('/admin/user');
    }
}