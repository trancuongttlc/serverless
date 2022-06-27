import { Service } from "typedi";
import DbHelper from "../utils/db-helper";

@Service()
export class UserService {
  private readonly db: DbHelper;

  constructor() {
    this.db = new DbHelper();
  }

  async getListUser() {
    return await this.db.list(process.env.USER_TABLE);
  }
}
