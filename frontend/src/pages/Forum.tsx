import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
    Home,
    SmilePlus,
    Heart,
    Brain,
    Cloud,
    Sun,
    ChevronRight,
    Send,
    Link as LinkIcon,
    Image,
    ChevronDown,
    Users,
    Search,
    Pencil,
    Trash2,
    ThumbsUp,
    MessageCircle
} from 'lucide-react';


interface Post {
    _id: string;
    content: string;
    imageUrl?: string;
    category: string;
    author: {
        _id: string;
        username: string;
        avatar: string;
    };
    createdAt: string;
    upvotes: string[];
    comments: Array<{
        _id: string;
        user: {
            _id: string;
            username: string;
            avatar: string;
        };
        content: string;
        createdAt: string;
    }>;
}


const Forum = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [postCategory, setPostCategory] = useState<string>('General');

    const categories = ['Welcome Center', 'Mindful Moments', 'Wellness Hub', 'Support Circle', 'General'];

    const [editingPost, setEditingPost] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');
    const userId = localStorage.getItem('userId');
    const [posts, setPosts] = useState<Post[]>([]);
    const [postText, setPostText] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);


    useEffect(() => {
        fetchPosts();
    }, []);
    const handleUpvote = async (postId: string) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/posts/${postId}/upvote`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPosts();
        } catch (error) {
            console.error('Error upvoting post:', error);
        }
    };

    const handleComment = async (postId: string, content: string) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/posts/${postId}/comments`,
                { content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchPosts();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };


    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/posts');
            console.log('Fetched posts:', response.data);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handlePost = async () => {
        if (!postText.trim()) return;

        setIsLoading(true);
        try {
            let imageUrl;
            if (selectedImage) {
                const formData = new FormData();
                formData.append('image', selectedImage);
                const uploadResponse = await axios.post('http://localhost:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                imageUrl = uploadResponse.data.url;
            }

            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/posts', {
                content: postText,
                imageUrl,
                category: postCategory,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setPostText('');
            setSelectedImage(null);
            setPostCategory('General');
            fetchPosts();
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    const handleEditPost = async (postId: string, content: string) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/posts/${postId}`,
                { content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEditingPost(null);
            fetchPosts();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleDeletePost = async (postId: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/posts/${postId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchPosts();
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };
    const handleDeleteComment = async (postId: string, commentId: string) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/posts/${postId}/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPosts();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log('Fetching user...');
                const token = localStorage.getItem('token');
                console.log('Token:', token);
                const response = await axios.get('http://localhost:5000/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCurrentUser(response.data.user);
                console.log(response.data.user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);


    return (
        <div className="min-h-screen bg-gray-50 p-6 flex gap-8">
            {/* Left Sidebar */}
            <div className="w-60 space-y-2 sticky top-6">
                <div className="bg-teal-700 text-white p-2 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold">SoulSpeak Community</h2>
                </div>

                <div className="bg-teal-700 rounded-lg shadow-sm">
                    <div className="p-2 border-b border-teal-600">
                        <div className="flex items-center gap-2 text-white">
                            <Home size={16} />
                            <span className="text-sm font-medium">Community Spaces</span>
                        </div>
                    </div>

                    <div className="p-2 space-y-1">
                        {['Welcome Center', 'Mindful Moments', 'Wellness Hub', 'Support Circle', 'About SoulSpeak'].map((item) => (
                            <button
                                key={item}
                                className="w-full bg-white hover:bg-gray-50 text-teal-800 p-2 rounded-md text-left transition-colors text-sm"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-teal-700 rounded-lg shadow-sm overflow-hidden">
                    <div className="p-2 text-white text-center border-b border-teal-600">
                        <Sun className="inline-block mb-1" size={20} />
                        <p className="text-sm font-medium">Your Wellness Journey</p>
                    </div>

                    <div className="text-white text-sm">
                        {[
                            {
                                label: 'Daily Reflections',
                                icon: Brain,
                                color: 'bg-purple-600',
                                hoverColor: 'hover:bg-purple-500',
                                subItems: [
                                    { name: 'Morning Journal', url: 'https://www.youtube.com/watch?v=MXXs9JC_ItQ' },
                                    { name: 'Evening Check-in', url: 'https://www.youtube.com/watch?v=ncy-I0Ag710' }
                                ]
                            },
                            {
                                label: 'Guided Practices',
                                icon: Heart,
                                color: 'bg-pink-600',
                                hoverColor: 'hover:bg-pink-500',
                                subItems: [
                                    { name: 'Meditation Guide', url: 'https://www.youtube.com/watch?v=vj0JDwQLof4' },
                                    { name: 'Breathing Tutorial', url: 'https://www.youtube.com/watch?v=LiUnFJ8P4gM' }
                                ]
                            },
                            {
                                label: 'Mood Tracker',
                                icon: SmilePlus,
                                color: 'bg-orange-600',
                                hoverColor: 'hover:bg-orange-500',
                                subItems: [
                                    { name: 'Track Your Mood', url: 'https://youtube.com/watch?v=mood-tracking' },
                                    { name: 'Emotional Wellness', url: 'https://youtube.com/watch?v=emotional-health' }
                                ]
                            },
                            {
                                label: 'Progress Path',
                                icon: Cloud,
                                color: 'bg-blue-600',
                                hoverColor: 'hover:bg-blue-500',
                                subItems: [
                                    { name: 'Goal Setting Guide', url: 'https://youtube.com/watch?v=goal-setting' },
                                    { name: 'Success Habits', url: 'https://youtube.com/watch?v=daily-habits' }
                                ]
                            }
                        ].map((item) => (
                            <div key={item.label}>
                                <button
                                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                                    className={`w-full p-2 text-left border-b border-teal-600 hover:bg-teal-600 flex justify-between items-center transition-colors ${item.color}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <item.icon size={16} />
                                        {item.label}
                                    </div>
                                    <ChevronDown size={14} className={`transform transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                                </button>
                                {openDropdown === item.label && (
                                    <div className={`${item.color}`}>
                                        {item.subItems.map((subItem) => (
                                            <a
                                                key={subItem.name}
                                                href={subItem.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`w-full p-2 pl-8 text-left ${item.hoverColor} text-sm transition-colors flex items-center gap-2 cursor-pointer`}
                                            >
                                                {subItem.name}
                                                <LinkIcon size={12} className="inline" />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center text-white">
                            <Users size={20} />
                        </div>
                        <div className="flex-1">
                            <textarea
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                                className="w-full p-4 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
                                placeholder="Share your thoughts with the community..."
                                rows={3}
                            />
                            <div className="flex justify-between mt-4">
                                <div className="flex gap-4">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <div className="mt-4">
                                        <select
                                            value={postCategory}
                                            onChange={(e) => setPostCategory(e.target.value)}
                                            className="w-full p-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                        >
                                            {categories.map(category => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        onClick={triggerFileInput}
                                        className="flex items-center gap-2 text-teal-700 hover:text-teal-800"
                                    >
                                        <Image size={18} />
                                        Photo
                                    </button>
                                    {selectedImage && (
                                        <span className="text-sm text-teal-600">
                                            {selectedImage.name}
                                        </span>
                                    )}
                                    <button className="flex items-center gap-2 text-teal-700 hover:text-teal-800">
                                        <LinkIcon size={18} />
                                        Link
                                    </button>
                                </div>
                                <button
                                    onClick={handlePost}
                                    disabled={isLoading}
                                    className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Posting...' : 'Post'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Feed */}
                <div className="space-y-4">
                    {posts
                        .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
                        .map((post) => (
                            <div key={post._id} className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-teal-700 rounded-full" />
                                        <div>
                                            <h4 className="font-medium">{post.author.username}</h4>
                                            <p className="text-sm text-gray-500">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    {String(post.author._id) === String(currentUser?._id) && (

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingPost(post._id);
                                                    setEditContent(post.content);
                                                }}
                                                className="text-teal-600 hover:text-teal-800"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeletePost(post._id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {editingPost === post._id ? (
                                    <div className="space-y-2">
                                        <textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="w-full p-2 border rounded-lg"
                                            rows={3}
                                        />
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={() => setEditingPost(null)}
                                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleEditPost(post._id, editContent)}
                                                className="px-3 py-1 text-sm bg-teal-600 text-white rounded hover:bg-teal-700"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="mb-3">{post.content}</p>
                                        {post.imageUrl && (
                                            <img
                                                src={post.imageUrl}
                                                alt="Post attachment"
                                                className="rounded-lg w-full"
                                            />
                                        )}
                                    </>
                                )}
                                <div className="flex items-center gap-4 mt-4">
                                    <button
                                        onClick={() => handleUpvote(post._id)}
                                        className={`flex items-center gap-1 ${post.upvotes.includes(currentUser?._id)
                                            ? 'text-teal-600'
                                            : 'text-gray-500'
                                            }`}
                                    >
                                        <ThumbsUp size={18} />
                                        <span>{post.upvotes.length}</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveCommentPost(activeCommentPost === post._id ? null : post._id)}
                                        className="flex items-center gap-1 text-gray-500 hover:text-teal-600"
                                    >
                                        <MessageCircle size={18} />
                                        <span>{post.comments.length}</span>
                                    </button>
                                </div>
                                {activeCommentPost === post._id && (
                                    <div className="mt-4">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={commentText}
                                                onChange={(e) => setCommentText(e.target.value)}
                                                className="flex-1 p-2 border rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                                placeholder="Write a comment..."
                                            />
                                            <button
                                                onClick={() => {
                                                    handleComment(post._id, commentText);
                                                    setCommentText('');
                                                    setActiveCommentPost(null);
                                                }}
                                                className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800"
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    </div>
                                )}


                                {/* Comments section */}
                                <div className="mt-4 space-y-2">
                                    {post.comments.map((comment, index) => {
                                        console.log('Comment user ID:', comment.user);
                                        console.log('Current user ID:', currentUser?._id);
                                        console.log('Are they equal?:', comment.user === currentUser?._id);
                                        return (
                                            <div key={index} className="bg-gray-50 p-3 rounded">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-teal-700 rounded-full" />
                                                        <div>
                                                            <span className="font-medium">{comment.user.username}</span>
                                                            <span className="text-xs text-gray-500 ml-2">
                                                                {new Date(comment.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {String(comment.user) === String(currentUser?._id) && (

                                                        <button
                                                            onClick={() => handleDeleteComment(post._id, comment._id)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                                <p className="mt-2 text-sm">{comment.content}</p>
                                            </div>
                                        )
                                    })}
                                </div>

                            </div>
                        ))}
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-60 space-y-3 sticky top-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-3">Filter by Category</h3>
                    <div className="space-y-2">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${selectedCategory === 'all'
                                ? 'bg-teal-700 text-white'
                                : 'hover:bg-gray-100'
                                }`}
                        >
                            All Posts
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${selectedCategory === category
                                    ? 'bg-teal-700 text-white'
                                    : 'hover:bg-gray-100'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-3 rounded-lg">
                    <h3 className="font-bold text-sm mb-2">See what's people posting</h3>
                    <img src="/api/placeholder/300/200" alt="Community illustration" className="rounded-lg w-full" />
                </div>

                <button className="w-full bg-teal-700 text-white p-2 rounded-lg flex justify-between items-center text-sm">
                    My Communities
                    <ChevronDown size={14} />
                </button>

                <button className="w-full bg-teal-700 text-white p-2 rounded-lg flex justify-between items-center text-sm">
                    Discover More
                    <ChevronRight size={14} />
                </button>

                <button className="w-full bg-teal-700 text-white p-2 rounded-lg flex justify-between items-center text-sm">
                    Quick Links
                    <ChevronDown size={14} />
                </button>
            </div>
        </div>
    );
};

export default Forum;
