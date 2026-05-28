// simulates the data fetching from a BD

// DTO for problem example
export interface ProblemExampleDTO {
    id: number
    title: string
    input: string
    output: string
    explanation: string

}

// DTO for a problem
export interface ProblemDTO {
    id: number
    title: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    description: string[] // each string is a paragraph
    examples: ProblemExampleDTO[]
}

// test case DTO
export interface TestCaseDTO {
    id: number
    input: string
    expectedOutput: string
}


// Problem mock

export const mockProblems: ProblemDTO[] = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        description: [
            "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
            "You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.",
            "You can return the answer in any order."
        ],
        examples: [
            {
                id: 1,
                title: "Example 1:",
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because `nums[0] + nums[1] == 9`, we return `[0, 1]`."
            },
            {
                id: 2,
                title: "Example 2:",
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
                explanation: "Because `nums[1] + nums[2] == 6`, we return `[1, 2]`."
            }
        ]
    },
    {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        description: [
            "Given a string `s`, find the length of the **longest substring** without repeating characters.",
            "A **substring** is a contiguous non-empty sequence of characters within a string."
        ],
        examples: [
            {
                id: 1,
                title: "Example 1:",
                input: "s = \"abcabcbb\"",
                output: "3",
                explanation: "The answer is \"abc\", with the length of 3."
            },
            {
                id: 2,
                title: "Example 2:",
                input: "s = \"pwwkew\"",
                output: "3",
                explanation: "The answer is \"wke\", with the length of 3.\n\nNotice that the answer must be a substring, \"pwke\" is a subsequence and not a substring."
            }
        ]
    },
    {
        id: 3190,
        title: "Find Minimum Operations to Make All Elements Divisible by Three",
        difficulty: "Easy",
        description: [
            "You are given an integer array `nums`. In one operation, you can add or subtract `1` from any element of `nums`.",
            "Return the **minimum** number of operations to make all elements of `nums` divisible by `3`."
        ],
        examples: [
            {
                id: 1,
                title: "Example 1:",
                input: "nums = [1,2,3,4]",
                output: "3",
                explanation: "All array elements can be made divisible by 3 using 3 operations:\n\n- Subtract 1 from 1.\n- Add 1 to 2.\n- Subtract 1 from 4."
            },
            {
                id: 2,
                title: "Example 2:",
                input: "nums = [3,6,9]",
                output: "0",
                explanation: "All elements are already divisible by 3.\n\n- No operations are needed."
            }
        ]
    },
    {
        id: 42,
        title: "Trapping Rain Water",
        difficulty: "Hard", 
        description: [
            "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.",
            "The elevation map is constrained by the maximum height of the bars on the left and right. Water can only be trapped in the 'valleys' between taller bars.",
            "Follow up: Could you solve this in `O(n)` time complexity and `O(1)` auxiliary space?"
        ],
        examples: [
            {
                id: 1,
                title: "Example 1:",
                input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
                output: "6",
                explanation: "The elevation map is represented by array `[0,1,0,2,1,0,1,3,2,1,2,1]`. In this case, **6 units** of rain water are being trapped in the valleys.\n\n* Index 2 traps `1` unit.\n* Index 5 traps `2` units.\n* Index 6 traps `1` unit.\n* Index 9 traps `1` unit.\n* Index 10 traps `1` unit.\n\nTotal: `1 + 2 + 1 + 1 + 1 = 6`."
            },
            {
                id: 2,
                title: "Example 2:",
                input: "height = [4,2,0,3,2,5]",
                output: "9",
                explanation: "The water trapped between the blocks is calculated as follows:\n* Between 4 and 5 (at index 2), the max water is `4 - 0 = 4`.\n* Total trapped water equals `9` units."
            }
        ]
    }
]