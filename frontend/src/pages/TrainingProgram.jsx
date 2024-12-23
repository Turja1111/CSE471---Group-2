import React from 'react';

const TrainingProgram = () => {

const learningMaterials = [
    {
        question: "What is the primary purpose of active listening?",
        options: [
            "To prepare your response",
            "To show you're paying attention",
            "To understand deeply and empathetically",
            "To pass time"
        ],
        correct: 2,
        relatedArticles: [
            {
                title: "The Art of Active Listening",
                link: "https://www.psychologytoday.com/us/blog/words-matter/201706/the-art-of-active-listening",
                description: "An overview of how active listening enhances communication."
            },
            {
                title: "Building Trust Through Listening",
                link: "https://hbr.org/2016/01/the-most-important-thing-you-can-do-for-your-team",
                description: "How active listening can foster trust in teams."
            }
        ]
    },
    {
        question: "Which emotion is considered a primary emotion?",
        options: [
            "Jealousy",
            "Fear",
            "Guilt",
            "Shame"
        ],
        correct: 1,
        relatedArticles: [
            {
                title: "Understanding Primary Emotions",
                link: "https://psychcentral.com/lib/primary-emotions",
                description: "A deep dive into primary emotions and their importance."
            },
            {
                title: "What Are Primary Emotions?",
                link: "https://www.verywellmind.com/primary-and-secondary-emotions-2795934",
                description: "How primary emotions are identified and why they matter."
            }
        ]
    },
    {
        question: "What is the first step in effective communication?",
        options: [
            "Making assumptions",
            "Listening actively",
            "Speaking loudly",
            "Avoiding eye contact"
        ],
        correct: 1,
        relatedArticles: [
            {
                title: "Active Listening: The Key to Effective Communication",
                link: "https://www.mindtools.com/CommSkll/ActiveListening.htm",
                description: "Why active listening is fundamental to communication."
            },
            {
                title: "The Importance of Listening in Communication",
                link: "https://www.skillsyouneed.com/ips/communication-skills.html",
                description: "How listening effectively improves your communication."
            }
        ]
    },
    {
        question: "What does EQ stand for?",
        options: [
            "Educational Quotient",
            "Emotional Quotient",
            "Energy Quotient",
            "Efficiency Quotient"
        ],
        correct: 1,
        relatedArticles: [
            {
                title: "What Is Emotional Intelligence (EQ)?",
                link: "https://www.psychologytoday.com/us/basics/emotional-intelligence",
                description: "An overview of emotional intelligence and its significance."
            },
            {
                title: "Emotional Intelligence: Why It Can Matter More Than IQ",
                link: "https://www.amazon.com/Emotional-Intelligence-Matter-More-Than/dp/055338371X",
                description: "A book that explores the role of EQ in personal and professional life."
            }
        ]
    },
    {
        question: "Which of these is an example of a growth mindset?",
        options: [
            "I’m not good at this, so I’ll give up.",
            "I can improve with effort and practice.",
            "Failure means I’m not smart.",
            "Only talent matters, not hard work."
        ],
        correct: 1,
        relatedArticles: [
            {
                title: "Growth Mindset vs Fixed Mindset",
                link: "https://www.psychologytoday.com/us/blog/saving-normal/201801/growth-mindset-vs-fixed-mindset",
                description: "Understanding the difference between growth and fixed mindsets."
            },
            {
                title: "The Power of a Growth Mindset",
                link: "https://www.mindsetworks.com/science/",
                description: "How a growth mindset influences success and learning."
            }
        ]
    },
    {
        question: "What does empathy involve?",
        options: [
            "Feeling sorry for someone",
            "Understanding and sharing someone’s feelings",
            "Giving advice to someone",
            "Agreeing with someone’s perspective"
        ],
        correct: 1,
        relatedArticles: [
            {
                title: "What is Empathy?",
                link: "https://greatergood.berkeley.edu/topic/empathy/definition",
                description: "A comprehensive guide to understanding empathy."
            },
            {
                title: "The Importance of Empathy in Communication",
                link: "https://www.psychologytoday.com/us/blog/saving-normal/201907/the-power-empathy",
                description: "Why empathy is crucial in building healthy relationships."
            }
        ]
    },
    {
        question: "What is the most effective way to handle conflict?",
        options: [
            "Avoid it completely",
            "Use open communication and collaboration",
            "Blame others for the issue",
            "Ignore the other person"
        ],
        correct: 1,
        relatedArticles: [
            {
                title: "How to Resolve Conflict Constructively",
                link: "https://www.mindtools.com/pages/article/newLDR_81.htm",
                description: "Steps to effectively manage and resolve conflicts."
            },
            {
                title: "Conflict Resolution in Teams",
                link: "https://hbr.org/2020/04/how-to-resolve-conflict-effectively",
                description: "Techniques for managing conflict in teams."
            }
        ]
    },
    {
        question: "Which of these is a sign of self-awareness?",
        options: [
            "Blaming others for mistakes",
            "Understanding your strengths and weaknesses",
            "Refusing feedback",
            "Avoiding personal growth"
        ],
        correct: 1,
        relatedArticles: [
            {
                title: "What is Self-Awareness?",
                link: "https://psychcentral.com/lib/self-awareness",
                description: "How self-awareness can improve decision-making and emotional control."
            },
            {
                title: "Self-Awareness and Personal Growth",
                link: "https://www.psychologytoday.com/us/blog/urban-survival/201906/the-importance-of-self-awareness",
                description: "The role of self-awareness in emotional growth."
            }
        ]
    },
    {
        question: "Which of these is NOT a primary emotion?",
        options: [
            "Joy",
            "Sadness",
            "Pride",
            "Anger"
        ],
        correct: 2,
        relatedArticles: [
            {
                title: "Primary vs Secondary Emotions",
                link: "https://www.verywellmind.com/primary-and-secondary-emotions-2795934",
                description: "The difference between primary and secondary emotions."
            },
            {
                title: "Understanding Emotions: Primary vs. Secondary",
                link: "https://www.psychologytoday.com/us/blog/words-matter/201706/what-are-primary-emotions",
                description: "What makes an emotion primary and why it matters."
            }
        ]
    },
    {
        question: "What is a key characteristic of active listening?",
        options: [
            "Interrupting the speaker",
            "Making eye contact and nodding",
            "Thinking about your next comment",
            "Focusing only on facts"
        ],
        correct: 1,
        relatedArticles: [
            {
                title: "The Art of Active Listening",
                link: "https://www.psychologytoday.com/us/blog/words-matter/201706/the-art-of-active-listening",
                description: "Deep dive into techniques and benefits of active listening."
            },
            {
                title: "Building Trust Through Listening",
                link: "https://hbr.org/2016/01/the-most-important-thing-you-can-do-for-your-team",
                description: "How active listening creates stronger relationships."
            }
        ]
    },
    {
        question: "What is the best way to give constructive feedback?",
        options: [
            "Focus on the person, not the behavior",
            "Use specific and actionable comments",
            "Be vague to avoid hurting feelings",
            "Focus only on negative aspects"
        ],
        correct: 1,
        relatedArticles: [
            {
                title: "How to Give Constructive Feedback",
                link: "https://www.forbes.com/sites/forbeshumanresourcescouncil/2020/10/19/five-tips-for-giving-constructive-feedback/?sh=67d38132b7a7",
                description: "Best practices for providing feedback that helps improve performance."
            },
            {
                title: "The Art of Giving Feedback",
                link: "https://www.mindtools.com/pages/article/newTMM_98.htm",
                description: "Effective strategies for offering actionable feedback."
            }
        ]
    },
    {
        question: "Which of these describes resilience?",
        options: [
            "Avoiding challenges",
            "Giving up easily",
            "Bouncing back from setbacks",
            "Focusing on negatives"
        ],
        correct: 2,
        relatedArticles: [
            {
                title: "Building Resilience",
                link: "https://www.psychologytoday.com/us/articles/202103/the-power-of-resilience",
                description: "How to build resilience and bounce back from adversity."
            },
            {
                title: "The Science of Resilience",
                link: "https://www.mindtools.com/pages/article/newLDR_98.htm",
                description: "The psychology behind resilience and its role in personal development."
            }
        ]
    },
    {
        question: "What is emotional regulation?",
        options: [
            "Suppressing emotions",
            "Recognizing and managing emotions",
            "Expressing emotions without control",
            "Ignoring emotions"
        ],
        correct: 1,
        relatedArticles: [
            {
                title: "Understanding Emotional Regulation",
                link: "https://www.psychologytoday.com/us/basics/emotion/emotional-regulation",
                description: "A guide to understanding emotional regulation and its importance."
            },
            {
                title: "The Role of Emotional Regulation in Mental Health",
                link: "https://www.psychcentral.com/lib/emotional-regulation",
                description: "How emotional regulation helps improve mental health."
            }
        ]
    },
    {
        question: "What does 'being present' mean?",
        options: [
            "Focusing on the past",
            "Ignoring your surroundings",
            "Fully engaging in the current moment",
            "Thinking about the future"
        ],
        correct: 2,
        relatedArticles: [
            {
                title: "The Power of Being Present",
                link: "https://www.psychologytoday.com/us/articles/202004/the-power-of-being-present",
                description: "Benefits of mindfulness and staying present in the moment."
            },
            {
                title: "How to Be More Present",
                link: "https://www.mindbodygreen.com/articles/how-to-be-more-present",
                description: "Practical ways to be more present in your daily life."
            }
        ]
    },
    {
        question: "Which skill helps in managing stress effectively?",
        options: [
            "Ignoring the issue",
            "Exercise and relaxation techniques",
            "Talking negatively about the problem",
            "Avoiding all challenges"
        ],
        correct: 1,
        relatedArticles: [
            {
                title: "Effective Stress Management Techniques",
                link: "https://www.psychologytoday.com/us/articles/202105/how-to-manage-stress",
                description: "How to use stress management techniques to cope better."
            },
            {
                title: "Relaxation Techniques for Stress Relief",
                link: "https://www.mindtools.com/pages/article/newTMM_09.htm",
                description: "Relaxation techniques for reducing stress effectively."
            }
        ]
    }
];
    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-3xl font-bold text-center mb-8">SoulSpeak Training Program</h1>
            <p className="text-lg text-gray-700 mb-8 text-center">
                Enhance your understanding with detailed explanations and curated resources for each topic.
            </p>
            
            <div className="space-y-8">
                {learningMaterials.map((material, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Topic {index + 1}: {material.question}
                        </h2>
                        
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">Understanding the Concept</h3>
                            <p className="text-gray-700">{material.explanation}</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-medium mb-3">Related Resources</h3>
                            <div className="space-y-4">
                                {material.relatedArticles.map((article, artIndex) => (
                                    <div key={artIndex} className="border-l-4 border-blue-500 pl-4">
                                        <h4 className="font-medium text-blue-600">
                                            <a href={article.link} className="hover:underline">
                                                {article.title}
                                            </a>
                                        </h4>
                                        <p className="text-sm text-gray-600">{article.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors">
                    Track Your Progress
                </button>
            </div>
        </div>
    );
};

export default TrainingProgram;
