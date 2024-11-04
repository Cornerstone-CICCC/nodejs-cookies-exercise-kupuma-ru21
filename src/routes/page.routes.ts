import { Request, Router } from "express";

const pageRouter = Router();

pageRouter.get("/", (_, res) => {
  res.render("index");
});

pageRouter.get("/login", (_, res) => {
  res.render("login");
});

pageRouter.post("/login", (req: Request, res) => {
  const { body } = req;
  if (
    body.userName === USER_DATA.userName &&
    body.password === USER_DATA.password
  ) {
    res.redirect("/set-cookie");
    return;
  }

  res.render("login");
});

pageRouter.get("/set-cookie", (_, res) => {
  res.cookie("userName", USER_DATA.userName, { signed: true });
  res.redirect("/profile");
});

pageRouter.get("/profile", (req, res) => {
  if (req.signedCookies.userName === USER_DATA.userName) {
    res.render("profile");
    return;
  }
  res.redirect("/login");
});

pageRouter.post("/logout", (_, res) => {
  res.clearCookie("userName");
  res.redirect("/login");
});

export default pageRouter;

const USER_DATA = { userName: "admin", password: "admin12345" };
