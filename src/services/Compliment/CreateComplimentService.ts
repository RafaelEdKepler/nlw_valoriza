import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../../repositories/ComplimentsRepositories";
import { TagsRepositories } from "../../repositories/TagsRepositories";
import { UserRepositories } from "../../repositories/UserRepositories";


interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({tag_id, user_sender, user_receiver, message} : IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const userRepositories = getCustomRepository(UserRepositories);
    const tagsRepositories = getCustomRepository(TagsRepositories);

    await this.validateInfo(tag_id, user_sender, user_receiver, message);
    await this.validateUsers(user_receiver, user_sender, userRepositories);
    await this.validateTag(tag_id, tagsRepositories);

    const compliment = complimentsRepositories.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    });

    return await complimentsRepositories.save(compliment);
  }

  async validateInfo(tag_id: string, 
      user_sender: string, 
      user_receiver: string, 
      message: string) {
    if (!tag_id) {
      throw new Error("Tag was not informed!");
    }

    if (!user_sender) {
      throw new Error("User sender was not informed!");
    }

    if (!user_receiver) {
      throw new Error("User receiver was not informed!");
    }

    if (!message) {
      throw new Error("Message was not informed!");
    }

    if (user_sender === user_receiver) {
      throw new Error("An user cannot register a compliment for himself!");
    }
  }

  async validateUsers(userReceiver: string, userSender: string, userRepositories: UserRepositories) {
    if (userReceiver === userSender) {
      throw new Error("An user cannot register a compliment for himself!");
    }
    
    let user = await userRepositories.findOne(userReceiver)

    if (!user) {
      throw new Error("User receiver is invalid!");
    }

    user = await userRepositories.findOne(userSender)

    if (!user) {
      throw new Error("User sender is invalid!");
    }
  }

  async validateTag(tagId: string, tagsRepositories: TagsRepositories) {
    const tag = await tagsRepositories.findOne(tagId);
    if (!tag) {
      throw new Error("Tag is invalid!");
    }
  }


}

export { CreateComplimentService };