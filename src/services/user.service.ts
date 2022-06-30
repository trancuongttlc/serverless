import { Service } from "typedi";
import DbHelper from "../utils/db-helper";
import { ListUserQuery } from "../models/user.query";
@Service()
export class UserService {
  private readonly db: DbHelper;

  constructor() {
    this.db = new DbHelper();
  }

  async getListUser(query: ListUserQuery) {
    const { limit } = query;
    return await this.db.list(process.env.USER_TABLE, limit);
  }
}
