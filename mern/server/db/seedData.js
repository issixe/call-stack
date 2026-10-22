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
                "text": "I'm sorry about that. Let me investigate.",
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
                }
            },
            "next_stage": "investigation"
        },
        "investigation": {
            "next_stage": "resolution"
        },
        "resolution": {
            "next_stage": null
        }
    
    }
  }
];
