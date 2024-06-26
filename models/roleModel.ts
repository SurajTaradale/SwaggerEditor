import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide a UserID Role"],
    },
    CollectionID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide a CollectionID Role"],
    }
});

const Roles = mongoose.models.Roles || mongoose.model("Roles", RolesSchema);

export default Roles;
