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


  // get all the blogs of a category
async getBlogsWithCategory(req:Request,res:Response){
  const Id = req.params.id;

  //get the blogs of the current user
  try{
    const categoryBlogs: any = await Category.findOne(
      { id: Id },
      {
        relations: ["blogs"],
      }
    );
    const blogs = categoryBlogs.blogs

    return res.send(blogs)
  }catch(error){
    return res.status(401).json({
      'error':error
    })
  }
}
//get all the category
async getAllCategory(req:Request,res:Response){
  try{
    const categories =await  Category.find();
    // res.status(200).json({
    //   blogs
    
    // });
    res.send(categories)

  }catch(err){
    res.send(err)
  }
}
}
