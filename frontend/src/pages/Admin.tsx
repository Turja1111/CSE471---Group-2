import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Question {
    _id: string;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correct: string;
    resource: string;
}

const Admin = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [formData, setFormData] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correct: '',
        resource: ''
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const response = await axios.get('http://localhost:5000/admin/questions');
        setQuestions(response.data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (editingId) {
            await axios.put(`http://localhost:5000/admin/questions/${editingId}`, formData, {headers: { Authorization: `Bearer ${token}` }});
        } else {
            console.log("Before posting")
            await axios.post('http://localhost:5000/admin/questions', formData,{headers: { Authorization: `Bearer ${token}` }});
        }
        setFormData({
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            correct: '',
            resource: ''
        });
        setEditingId(null);
        fetchQuestions();
    };

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/admin/questions/${id}`,{headers: { Authorization: `Bearer ${token}` }});
        fetchQuestions();
    };

    const handleEdit = (question: Question) => {
        setFormData({
            question: question.question,
            option1: question.option1,
            option2: question.option2,
            option3: question.option3,
            option4: question.option4,
            correct: question.correct,
            resource: question.resource
        });
        setEditingId(question._id);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <input
                    type="text"
                    name="question"
                    placeholder="Question"
                    value={formData.question}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="option1"
                    placeholder="Option 1"
                    value={formData.option1}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="option2"
                    placeholder="Option 2"
                    value={formData.option2}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="option3"
                    placeholder="Option 3"
                    value={formData.option3}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="option4"
                    placeholder="Option 4"
                    value={formData.option4}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="correct"
                    placeholder="Correct Answer"
                    value={formData.correct}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="resource"
                    placeholder="Resource Link"
                    value={formData.resource}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {editingId ? 'Update Question' : 'Add Question'}
                </button>
            </form>

            <div className="space-y-4">
                {questions.map((question) => (
                    <div key={question._id} className="border p-4 rounded">
                        <h3 className="font-bold">{question.question}</h3>
                        <div className="ml-4">
                            <p>1. {question.option1}</p>
                            <p>2. {question.option2}</p>
                            <p>3. {question.option3}</p>
                            <p>4. {question.option4}</p>
                            <p>Answer: {question.correct}</p>
                            <p>Resource: {question.resource}</p>
                        </div>
                        <div className="mt-2 space-x-2">
                            <button
                                onClick={() => handleEdit(question)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(question._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
