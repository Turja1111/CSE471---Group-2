import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Post from '../models/Post.js';

const JWT_SECRET = "soul";


export const profile = async (req, res) => {
    console.log("Received request to get profile");
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

export const updateProfile = async (req, res) => {
    console.log("Received request to update profile");
    try {
        const { name, username, email, password, newPassword, referral,
            mentalCondition,
            ageGroup,
            country,
            goals,
            preferences } = req.body;
        const userId = req.user.id; // Get user ID from the token
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const emailtaken = await User.findOne({ email })
        if (emailtaken && emailtaken._id != userId) {
            return res.status(400).json({ message: "Email already in use." });
        }
        if (newPassword != "") {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid current password." });
            }
            user.password = await bcrypt.hash(newPassword, 10);
        }
        const user_updated = await User.findByIdAndUpdate(userId, {
            name,
            username,
            email,
            referral,
            mentalCondition,
            ageGroup,
            country,
            goals,
            preferences
        }, { new: true });  
        // user.name = name || user.name;
        // user.username = username || user.username;
        // user.email = email || user.email;

        await user_updated.save();
        console.log("User updated:", user_updated);
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};


export const createPost = async (req, res) => {
    console.log("Received request to create a post");
    try {
        const newPost = new Post({
            content: req.body.content,
            imageUrl: req.body.imageUrl,
            category: req.body.category,
            author: req.user.id,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post' });
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to edit this post' });
        }

        post.content = req.body.content;
        post.imageUrl = req.body.imageUrl;
        post.category = req.body.category || post.category;
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post' });
    }
};

export const getPosts = async (req, res) => {
    try {
        const { category } = req.query;
        const query = category && category !== 'all' ? { category } : {};
        
        const posts = await Post.find(query)
            .sort({ createdAt: -1 })
            .populate('author', 'username avatar');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        await post.deleteOne();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post' });
    }
};

export const upvotePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const upvoteIndex = post.upvotes.indexOf(req.user.id);
        if (upvoteIndex === -1) {
            post.upvotes.push(req.user.id);
        } else {
            post.upvotes.splice(upvoteIndex, 1);
        }
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error updating upvote' });
    }
};

export const addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = {
            user: req.user.id,
            content: req.body.content
        };
        post.comments.push(comment);
        await post.save();
        
        const populatedPost = await Post.findById(post._id)
            .populate('comments.user', 'username avatar _id');
        
        res.json(populatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment' });
    }
};

export const getComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('comments.user', 'username avatar _id');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post.comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments' });
    }
};

export const deleteComment = async (req, res) => {
    console.log("Received request to delete a comment");
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = post.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== req.user.id) {
            console.log("Post not authorized to delete this comment");
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }
        console.log("Comment found and authorized to delete");
        post.comments.pull({ _id: req.params.commentId });
        await post.save();
        console.log("Comment deleted successfully");
        
        const populatedPost = await Post.findById(post._id)
            .populate('comments.user', 'username avatar');
        
        res.json(populatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment' });
    }
};


