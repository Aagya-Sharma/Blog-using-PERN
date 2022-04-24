import { EntityRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";
import { Request, Response } from "express";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  // Create a new category

  async addCategory(req: Request, res: Response) {
    const { name } = req.body;
    if(!name){
      return res.status(401).json({
        'error':'Please add a name '
      })
    }
    try {
      let category = new Category();
      category.name = name;
      
      let catData = await this.save(category);
      return res.send(catData);
    } catch (error) {
      res.send(error);
    }
  }
}
