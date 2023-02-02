import {DataTypes, Model, Optional} from "sequelize";
import { IPostAttributes } from "./post.entity";
import db from "../database/sqlite.db";

interface IUserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  posts: IPostAttributes[] | []
}

class User extends Model<Optional<IUserAttributes, 'id' | 'posts'>> {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'user',
    tableName: 'users'
  }
);

export { User, IUserAttributes };