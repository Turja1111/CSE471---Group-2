import User from "../models/userModel.js";
import Question from "../models/questionModel.js";


export async function get_all_questions(request, response) {
    try {
        const questions = await Question.find();
        return response.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        return response.status(500).json({ message: "Internal server error." });
    }
}

export async function add_companion_test_question(request, response) {
    console.log("Received request to add a question");
    try {
        const body = await request.body
        const { question, option1, option2, option3, option4, correct, resource } = body;
        if (!question || !option1 || !option2 || !option3 || !option4 || !correct || !resource) {
            return response.status(400).json({ message: "All fields are required." });
        }
        const user = await User.findById(request.user.id);
        console.log(user)
        if (!user) {
            return response.status(401).json({ message: "User not found." });
        }
        if (!(user.email === "asiradnan23@gmail.com")) {
            return response.status(403).json({ message: "You are not authorized to add questions." });
        }
        const newQuestion = new Question({
            question,
            option1,
            option2,
            option3,
            option4,
            correct,
            resource,
        });
        await newQuestion.save();
        console.log("Question added successfully:", newQuestion);
        return response.status(201).json({ message: "Question added successfully." });
    } catch (error) {
        console.error("Error during signup:", error);
        return response.status(500).json({ message: "Internal server error." });
    }
}

export async function delete_question(request, response) {
    console.log("Received request to delete a question");
    try {
        const { id } = request.params;  
        const user = await User.findById(request.user.id);
        if (!user) {
            return response.status(401).json({ message: "User not found." });
        }
        if (!(user.email === "asiradnan23@gmail.com")) {
            return response.status(403).json({ message: "You are not authorized to delete questions." });
        }
        const deletedQuestion = await Question.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return response.status(404).json({ message: "Question not found." });
        }
        return response.status(200).json({ message: "Question deleted successfully." });
    } catch (error) {
        console.error("Error deleting question:", error);  // Updated error message
        return response.status(500).json({ message: "Internal server error." });
    }
}

export async function update_question(request, response){
    try {
        const { id } = request.params;  // Get id from params
        const { question, option1, option2, option3, option4, correct, resource } = request.body;  // Remove _id from body
        const user = await User.findById(request.user.id);
        if (!user) {
            return response.status(401).json({ message: "User not found." });
        }
        if (!(user.email === "asiradnan23@gmail.com")) {
            return response.status(403).json({ message: "You are not authorized to update questions." });
        }
        const updatedQuestion = await Question.findByIdAndUpdate(
            id,  
            {
                question,
                option1,
                option2,
                option3,
                option4,
                correct,
                resource,
            },
            { new: true }
        );
        if (!updatedQuestion) {
            return response.status(404).json({ message: "Question not found." });
        }
        return response.status(200).json({ message: "Question updated successfully." });
    } catch (error) {
        console.error("Error updating question:", error);  // Updated error message
        return response.status(500).json({ message: "Internal server error." });
    }
}
