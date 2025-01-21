import sequelize from "../db_connection";
import { DataTypes, Model } from "sequelize";
import { User } from "./User";

export class Event extends Model {
  id!: number;
  name!: string;
  description!: string;
  start_time!: Date;
  end_time!: Date;
  image!: string;
  location!: string;
  user_id!: number;

  user?: User;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Event",
    tableName: "Events",
    timestamps: true,
  }
);

// associations
Event.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
