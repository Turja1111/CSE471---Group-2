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