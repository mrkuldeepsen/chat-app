import { DataTypes, Model, Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface UserModel extends Model<UserAttributes>, UserAttributes {}

const User = (sequelize: Sequelize) => {
  const User = sequelize.define<UserModel>("User", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return User;
};

export default User;
