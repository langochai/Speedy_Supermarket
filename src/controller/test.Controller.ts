export class TestController {
    static showHomeAdmin(req: any, res: any) {
        res.render("admin");
    }

    static showHomeUser(req: any, res: any) {
        res.render("user");
    }
}