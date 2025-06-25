import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    projects: [
        {
            company: {
                type: String,
                required: true
            },
            projectName: {
                type: String,
                min: 2,
                required: true
            },
            apiKey: {
                type: String,
                required: true
            },
            validity: {
                type: Date,
                required: true
            }
        }
    ],
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Company = mongoose.model("Company", CompanySchema);
export default Company;