import { Elysia } from "elysia";
import authController from "../../controllers/auth-controller";

const generalDetails = { tags: ["auth"] };
export const auth = (app: Elysia) =>
  app
    .post("/signup", (ctx) => authController.signup(ctx), {
      detail: { operationId: "signup", ...generalDetails },
      ...authController.signupValidator,
    })
    .post("/signin", (ctx) => authController.signin(ctx), {
      detail: { operationId: "signin", ...generalDetails },
      ...authController.signinValidator,
    })
    .post("/signout", (ctx) => authController.signout(ctx), {
      detail: { operationId: "signout", ...generalDetails },
      ...authController.signoutValidator,
    })
    .get("/refresh", (ctx) => authController.refresh(ctx), {
      detail: { operationId: "signout", ...generalDetails },
      ...authController.refreshValidator,
    });
