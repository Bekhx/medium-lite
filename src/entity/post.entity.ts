import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '../database/sqlite.db';
import { User } from './user.entity';

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare authorId: ForeignKey<User['id']>;
  declare readingTime: string;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(15000),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    readingTime: DataTypes.STRING(10)
  },
  {
    sequelize: db,
    modelName: 'post',
    tableName: 'posts'
  }
);

User.hasMany(Post, {
  sourceKey: 'id',
  foreignKey: 'authorId',
  as: 'posts'
});


export { Post };