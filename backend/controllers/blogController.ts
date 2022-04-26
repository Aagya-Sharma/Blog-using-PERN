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

  static async getBlogs(req: Request, res: Response) {
    let entityManager = getManager();
    const manager = entityManager.getCustomRepository(BlogRepository);
    await manager.getBlogs(req, res);
  }

  static async getBlog(req: Request, res: Response) {
    let entityManager = getManager();
    const manager = entityManager.getCustomRepository(BlogRepository);
    await manager.getBlog(req, res);
  }

  static async updateBlog(req: Request, res: Response) {
    let entityManager = getManager();
    const manager = entityManager.getCustomRepository(BlogRepository);
    await manager.updateBlog(req, res);
  }
}

