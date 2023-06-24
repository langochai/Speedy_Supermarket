export class HomeController {
    static showHome(req: any, res: any) {
        console.log(req.user);
        res.render("index");
    }
}