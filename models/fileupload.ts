import mongoose from "mongoose";

const CollectionsSchema = new mongoose.Schema({
    collectionname: {
        type: String,
        required: [true, "Please provide a collection name"],
    },
    filename: {
        type: String,
        required: [true, "Please provide a filename"],
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
    },
    valid: {
        type: String,
        required: [true, "Please provide a valid"],
    },
});

const Collection = mongoose.models.Collection || mongoose.model("Collection", CollectionsSchema);

export default Collection;
