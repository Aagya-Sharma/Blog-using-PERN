import { Request, Response } from "express";
import { getConnection, getManager } from "typeorm";
import { CategoryRepository } from "../repositories/categoryRepo";

export class Categorycontroller {
  //@desc create a category
  //@route /create/category
  //@access public

  static async addCategory(req: Request, res: Response) {
    let entityManager = getManager();
    const manager = entityManager.getCustomRepository(CategoryRepository);
    await manager.addCategory(req, res);
  }
  static async getBlogsWithCategory(req: Request, res: Response) {
    let entityManager = getManager();
    const manager = entityManager.getCustomRepository(CategoryRepository);
    await manager.getBlogsWithCategory(req, res);
  }
  static async getAllCategory(req: Request, res: Response) {
    let entityManager = getManager();
    const manager = entityManager.getCustomRepository(CategoryRepository);
    await manager.getAllCategory(req, res);
  }
}

