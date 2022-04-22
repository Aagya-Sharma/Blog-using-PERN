import { Request, Response } from "express";
import { getConnection, getManager } from "typeorm";
import { BlogRepository } from "../repositories/blogRepo";

export class BlogController {
  //@desc create a blog
  //@route /api/create/blog
  //@access public

  static async addBlog(req: Request, res: Response) {
    let entityManager = getManager();
    const manager = entityManager.getCustomRepository(BlogRepository);
    await manager.addBlog(req, res);
  }
}

