import {IUserAttributes, User} from "./user.entity";
import {DataTypes, Model, Optional} from "sequelize";
import db from "../database/sqlite.db";

interface IPostAttributes {
  id: number;
  title: string;
  content: string;
  author?: IUserAttributes
}

class Post extends Model<Optional<IPostAttributes, 'id'>> {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'post',
    tableName: 'posts'
  }
);

Post.belongsTo(User, { as: 'author' });
User.hasMany(Post, { as: 'posts' });

export { Post, IPostAttributes };