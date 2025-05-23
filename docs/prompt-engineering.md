# Prompt Engineering Guide

This guide provides techniques and best practices for crafting effective prompts in LocoLama to get the most out of your local LLM.

## Table of Contents

- [Prompt Engineering Basics](#prompt-engineering-basics)
- [Effective Prompting Techniques](#effective-prompting-techniques)
- [Task-Specific Prompting](#task-specific-prompting)
- [Advanced Strategies](#advanced-strategies)
- [Troubleshooting Poor Responses](#troubleshooting-poor-responses)
- [Model-Specific Tips](#model-specific-tips)
- [Examples Library](#examples-library)

## Prompt Engineering Basics

### What is Prompt Engineering?

Prompt engineering is the practice of crafting input text (prompts) to effectively communicate with AI language models to achieve desired outputs. It's about learning to "speak the language" of AI models.

### Why is it Important?

The quality of your prompts directly affects:
- The relevance of responses
- The accuracy of information
- The format and structure of outputs
- The creativity and usefulness of generated content

### Core Principles

1. **Be Clear and Specific**: Clearly state what you want
2. **Provide Context**: Give necessary background information
3. **Structure Your Request**: Organize your prompt logically
4. **Set Expectations**: Specify format, length, style, etc.
5. **Iterate and Refine**: Improve prompts based on responses

## Effective Prompting Techniques

### Be Specific and Direct

**Less Effective**: 
```
Tell me about space.
```

**More Effective**: 
```
Explain the formation of black holes, their key characteristics, and how 
scientists detect them. Include recent discoveries from the last 5 years.
```

### Use Clear Instructions

**Less Effective**: 
```
Write something about climate change solutions.
```

**More Effective**: 
```
Write a 300-word summary of the most promising technological solutions 
to climate change. Focus on solutions that could be implemented within 
the next decade and include their potential impact and challenges.
```

### Provide Context

**Less Effective**: 
```
How do I fix this error?
```

**More Effective**: 
```
I'm getting the following error in my Python code:
"TypeError: can only concatenate str (not "int") to str"

Here's the relevant code:
name = "User"
age = 30
message = "Hello, " + name + ". You are " + age + " years old."

How do I fix this error and what's causing it?
```

### Use Formatting for Clarity

**Less Effective**: 
```
Compare renewable energy sources advantages disadvantages costs efficiency.
```

**More Effective**: 
```
Compare solar, wind, and hydroelectric power based on:
1. Initial setup costs
2. Long-term maintenance
3. Energy efficiency
4. Environmental impact
5. Scalability

Present your answer in a table format with these categories as rows and 
the energy types as columns.
```

### Specify the Desired Output Format

**Less Effective**: 
```
Give me a workout plan.
```

**More Effective**: 
```
Create a 5-day workout plan for building upper body strength. For each day:
- List 4-5 exercises
- Specify sets and reps for each exercise
- Include rest periods
- Note any equipment needed

Format this as a structured weekly schedule that a beginner could follow.
```

## Task-Specific Prompting

### For Creative Writing

```
Write a short story about a time traveler who accidentally changes history.
The story should:
- Be approximately 500 words
- Include vivid sensory details
- Have a surprising twist ending
- Be written in first-person perspective
- Take place in Victorian London
```

### For Code Generation

```
Write a Python function that takes a list of integers and returns the 
top 3 most frequent elements. If there's a tie, prioritize the larger numbers.

Include:
1. The function definition with appropriate type hints
2. Comments explaining your approach
3. Example usage
4. Edge case handling (empty lists, lists with fewer than 3 unique elements)
```

### For Data Analysis

```
I have a dataset of customer purchases with columns for customer_id, 
purchase_date, product_category, and purchase_amount.

Write SQL queries to:
1. Find the top 5 customers by total spending
2. Calculate monthly revenue by product category
3. Identify customers who haven't made a purchase in the last 6 months
4. Find the average purchase amount by day of week

Explain each query and what insights it might provide.
```

### For Summarization

```
Summarize the following text in 3-4 bullet points, highlighting the main 
arguments and key statistics. Maintain the original tone and perspective.

[Insert text to summarize here]
```

## Advanced Strategies

### Chain of Thought Prompting

Ask the model to work through a problem step by step:

```
Question: A store has 25 apples. If they sell 60% of the apples and then 
buy 15 more, how many apples do they have now?

Please solve this step-by-step:
1. Calculate how many apples are sold
2. Determine how many remain after selling
3. Add the newly purchased apples
4. State the final answer
```

### Role Prompting

Assign a specific role or persona to the model:

```
Act as an experienced cybersecurity expert. Review the following network 
setup and identify potential security vulnerabilities, explaining why 
each is a concern and how to address it:

[Network details here]
```

### Few-Shot Learning

Provide examples of the desired input-output pattern:

```
Translate the following English phrases to French:

English: "Hello, how are you?"
French: "Bonjour, comment allez-vous?"

English: "Where is the train station?"
French: "Où est la gare?"

English: "I would like to order dinner."
French:
```

### Iterative Refinement

Start with a basic output and then refine it:

```
First prompt: "Write a brief product description for a new smartphone."

[After receiving initial response]

Second prompt: "That's a good start. Now enhance the description by:
1. Adding more technical specifications
2. Including 3 key differentiating features
3. Making the language more exciting and persuasive"
```

## Troubleshooting Poor Responses

### If Responses Are Too Vague

**Problem**: Model gives generic, surface-level information.

**Solution**: 
```
Please provide a more detailed and specific response. Include concrete 
examples, relevant data points, and deeper analysis. Avoid general 
statements that could apply to any situation.
```

### If Responses Are Inaccurate

**Problem**: Model provides incorrect information.

**Solution**:
```
I believe some of the information you provided may not be accurate. 
Please verify the following points and correct any inaccuracies:
[List specific points]

If you're uncertain about any information, please indicate this clearly 
rather than making assumptions.
```

### If Responses Are Too Long

**Problem**: Model generates excessively verbose responses.

**Solution**:
```
Please provide a more concise response, limited to approximately 
[X] words/paragraphs. Focus only on the most essential information 
and remove any redundant explanations.
```

### If Responses Are Poorly Structured

**Problem**: Information is disorganized or hard to follow.

**Solution**:
```
Please restructure your response to be more organized. Use headings, 
bullet points, and numbered lists where appropriate. Present information 
in a logical sequence from basic concepts to more advanced details.
```

## Model-Specific Tips

### For LLaMA 2

- Performs well with detailed, structured prompts
- Benefits from chain-of-thought reasoning
- Works well with role-based prompting
- May require more explicit instructions for creative tasks

### For Mistral

- Responds well to concise, clear instructions
- Good at following formatting requests
- Performs well with few-shot examples
- May need more guidance for complex reasoning tasks

### For CodeLlama

- Provide context about the programming language and environment
- Specify desired code style and documentation level
- Include example inputs and expected outputs
- Be explicit about error handling requirements

## Examples Library

### Academic Writing

```
Write an abstract for a research paper on the topic of [topic]. 
The abstract should:
- Be approximately 250 words
- Follow academic writing conventions
- Include research question, methodology, findings, and implications
- Use formal, scholarly language
```

### Business Analysis

```
Conduct a SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) 
for a company that [describe business]. For each category, provide 
3-4 points with brief explanations of their significance.
```

### Technical Documentation

```
Create a user guide section explaining how to [specific task] in 
[software/product]. Include:
- Prerequisites
- Step-by-step instructions
- Screenshots or descriptions of what the user will see
- Common troubleshooting tips
- Write for a user with [beginner/intermediate/advanced] technical knowledge
```

### Creative Prompts

```
Write a poem about [topic] in the style of [poet/style]. The poem should:
- Be approximately [length] lines
- Use [specific literary devices]
- Convey a mood of [desired emotion]
- Include imagery related to [specific elements]
```

### Educational Content

```
Explain [complex concept] as if teaching it to a [age/education level] student.
Use analogies, examples, and simple language while maintaining accuracy.
Include 2-3 practice questions at the end to test understanding.
```
