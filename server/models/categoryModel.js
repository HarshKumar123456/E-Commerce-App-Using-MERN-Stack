import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("CATEGORY",categorySchema);

export default Category;