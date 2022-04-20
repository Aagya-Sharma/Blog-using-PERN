import { Request, Response } from "express";
import { getConnection, getManager } from "typeorm";
import { UserRepository } from "../repositories/userRepo";

export class Authcontroller {
  //@desc Register a user
  //@route /Add
  //@access public

  static async createUser(req: Request, res: Response) {
    let entityManager = getManager();
    const manager = entityManager.getCustomRepository(UserRepository);
    await manager.createUser(req, res);
  }

  //@desc login a user
  //@route /login
  //@access public

  static async loginUser(req: Request, res: Response) {
    let entityManager = getManager();
    const manager = entityManager.getCustomRepository(UserRepository);
    await manager.loginUser(req, res);
  }

  //@desc - Recover password  generates the token and send the reset link
  //@route /forget-password
  

  static async forgetPassword(req: Request, res: Response) {
    let entityManager = getManager();
    const manager = entityManager.getCustomRepository(UserRepository);
    await manager.forgetPassword(req, res);
  }

  // @route POST /resetPassword
  // @desc Reset Password
  // @access Public

static async resetPassword(req: Request, res: Response) {
  let entityManager = getManager();
  const manager = entityManager.getCustomRepository(UserRepository);
  await manager.resetPassword(req, res);
}

}

