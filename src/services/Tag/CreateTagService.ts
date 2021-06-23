import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../../repositories/TagsRepositories"


class CreateTagService {
  async execute(name : string) {
    const tagsRepositories = getCustomRepository(TagsRepositories);
    
    await this.validateInfo(name, tagsRepositories);

    const tag = tagsRepositories.create({
      name
    });

    await tagsRepositories.save(tag);

    return tag;
  }


  async validateInfo(name: string, tagsRepositories: TagsRepositories) {
    if (!name) {
      throw new Error("Tag name was not informed");
    }

    const tagExists = await tagsRepositories.findOne({
      name
    });

    if (tagExists) {
      throw new Error("Tag already exists");
    }
  }
}

export { CreateTagService }