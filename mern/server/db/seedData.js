// server/db/seedData.js

export const exampleLessons = [
  {
    "module_id": "double_billing",
    "title": "Double Billing Complaint",
    "starting_stage": "initial complaint",
    "stages": {
        "initial complaint": {
            "customer responses": {
                "calm": "Hi, I noticed I have been charged twice for my last month's bill",
                "frustrated": "I can't believe I was charged twice for my last month's bill!",
                "angry": "This is unacceptable! I was charged twice for my last month's bill!"
            },
            "answers": {
                "A": {
                "text": "I'm sorry about that, let me investigate. What's your name and birthday? ",
                "scores": {
                    "compliance": 100,
                    "process": 90,
                    "communication": 95,
                    "efficiency": 90,
                    "outcome": 85
                        }
                },
                "B": {
                "text": "You'll need to contact billing.",
                "scores": {
                    "compliance": 70,
                    "process": 40,
                    "communication": 30,
                    "efficiency": 50,
                    "outcome": 20
                }
                },
                "C": {
                "text": "That's strange, we never do that.",
                "scores": {
                    "compliance": 5,
                    "process": 10,
                    "communication": 15,
                    "efficiency": 5,
                    "outcome": 5
                }
                }
            },
            "next_stage": "investigation"
        },
        "investigation": {
            "customer responses": {
                "calm": "Thanks for investigating for me. My name is Jane Doe and my birthday is January 10, 2000.",
                "frustrated": "Well can't you just check for me? My name is Jane Doe and my birthday is January 10, 2000.",
                "angry": "I can clearly see that I was charged twice. Just do your job and check my account. My name is Jane Doe and my birthday is January 10, 2000."
            },
            "answers": {
                "A": {
                "text": "Oh I guess we did make a mistake. I'll fix that for you–-it should be resolved within a week. What else can I do for you?",
                "scores": {
                    "compliance": 80,
                    "process": 50,
                    "communication": 30,
                    "efficiency": 75,
                    "outcome": 75
                        }
                },
                "B": {
                "text": "Oh haha what a silly mistake. Don't worry about it. Anything else you need?",
                "scores": {
                    "compliance": 10,
                    "process": 5,
                    "communication": 5,
                    "efficiency": 10,
                    "outcome": 10
                }
                },
                "C": {
                "text": "Ah it looks like we did double charge you last month. So sorry about that, I have put in a request to refund you the second charge. It should land in your bank account within the next week. Is there anything else I can help you with?",
                "scores": {
                    "compliance": 90,
                    "process": 90,
                    "communication": 90,
                    "efficiency": 90,
                    "outcome": 95
                }
                }
            },
            "next_stage": "resolution"
        },
        "resolution": {
            "customer responses": {
                "calm": "That's all from me, thank you!",
                "frustrated": "Uhh yeah that's everything I need I guess.",
                "angry": "That's all I need from you, yeah. I'm gonna get in contact with your manager next."
            },
            "answers": {
                "A": {
                "text": "Alright, have a great day!",
                "scores": {
                    "compliance": 85,
                    "process": 90,
                    "communication": 80,
                    "efficiency": 80,
                    "outcome": 90
                        }
                },
                "B": {
                "text": "Okay, sounds good.",
                "scores": {
                    "compliance": 60,
                    "process": 30,
                    "communication": 70,
                    "efficiency": 70,
                    "outcome": 60
                }
                },
                "C": {
                "text": "Bye then.",
                "scores": {
                    "compliance": 30,
                    "process": 20,
                    "communication": 10,
                    "efficiency": 70,
                    "outcome": 60
                }
                }
            },
            "next_stage": null
        }
    
    }
  }
];
