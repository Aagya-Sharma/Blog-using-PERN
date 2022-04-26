import {
  EntityRepository,
  getConnection,
  getRepository,
  RelationId,
  Repository,
} from "typeorm";
import { Blog } from "../entities/Blog";
import { Request, Response } from "express";
import { User } from "../entities/User";

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog> {
  async addBlog(req: Request, res: Response) {
    const { title, desc, imageurl } = req.body;
    const id = req.user.id;

    try {
      // Create new article/blog post

      let blog = new Blog();
      blog.title = title;
      blog.desc = desc;
      blog.imageurl = imageurl;

      const UserRepo = getRepository(User);

      // Find the author of the post using id

      const currentUser: any = await UserRepo.findOne({ id: id });
      console.log(currentUser)

      // Find the aritcles that the author has posted using the realtion

      const userWithBlog: any = await UserRepo.findOne(
        { id: id },
        {
          relations: ["blogs"],
        }
      );

      // Save the articles associated with an user

      const blogArray = userWithBlog.blogs;

      currentUser.blogs = [...blogArray, blog];
      let userContent = await this.save(blog);

      await UserRepo.save(currentUser);

      res.status(400).send(userContent);
    } catch (error) {
      res.send({
        message: "The upload was unsuccessfull",
      });
    }
  }


// get all the blogs of a user
async getBlogs(req:Request,res:Response){
  const userId = req.user.id;

  //get the blogs of the current user
  try{
    const UserRepo = getRepository(User);

    
    const userBlogs: any = await UserRepo.findOne(
      { id: userId },
      {
        relations: ["blogs"],
      }
    );
    const blogs = userBlogs.blogs

    return res.status(200).json({
      blogs
    })
  }catch(error){
    return res.status(401).json({
      'error':error
    })
  }
}

//get the details of a particular user
async getBlog(req:Request,res:Response){
  const BlogId = req.params.BlogId;

  try{
    const blog:any= await Blog.findOne({id:BlogId});
    console.log(blog)
    res.status(200).json({
      title: blog.title,
      desc: blog.desc,
      imageurl: blog.imageurl,
    }); 
  }catch(err){
    return res.json({
      'error':err
    })
  }
}

//update a single blog
async updateBlog(req: Request, res: Response) {
  const { title, desc, imageurl } = req.body;
  const blogId = req.params.BlogId;

  try {
    //find the blog using the id 
    const blog:any = await Blog.findOne({id:blogId})
    blog.title = title;
    blog.desc = desc;
    blog.imageurl = imageurl
    
    let updatedArticle = await this.save(blog)
    res.send(updatedArticle);
    console.log(updatedArticle)
  } catch (error) {
    res.json({
      'error':error,
    });
  }
}


}
