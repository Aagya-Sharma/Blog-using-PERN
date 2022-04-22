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
}