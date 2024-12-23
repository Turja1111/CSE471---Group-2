import React, { useState, useRef } from 'react';
import { 
    Sun, 
    Brain, 
    Heart, 
    SmilePlus, 
    Cloud, 
    ChevronDown, 
    Link as LinkIcon 
} from 'lucide-react';

const Forum = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const menuItems = [
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
    ];

    return (
        <div className="bg-teal-700 rounded-lg shadow-sm overflow-hidden">
            <div className="p-2 text-white text-center border-b border-teal-600">
                <Sun className="inline-block mb-1" size={20} />
                <p className="text-sm font-medium">Your Wellness Journey</p>
            </div>

            <div className="text-white text-sm">
                {menuItems.map((item) => (
                    <div key={item.label}>
                        <button
                            onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                            className={`w-full p-2 text-left border-b border-teal-600 flex justify-between items-center transition-colors ${item.color}`}
                        >
                            <div className="flex items-center gap-2">
                                <item.icon size={16} />
                                {item.label}
                            </div>
                            <ChevronDown
                                size={14}
                                className={`transform transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                            />
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
    );
};

export default Forum;
