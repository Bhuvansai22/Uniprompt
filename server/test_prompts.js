const prompts = [
    "write code",
    "fix this bug",
    "make a website",
    "explain quantum physics",
    "I need a logo"
];

async function testPrompts() {
    console.log("Testing Prompt Optimizer with Vague Inputs...\n");
    console.log("==================================================\n");

    for (const prompt of prompts) {
        try {
            console.log(`Input: "${prompt}"`);
            const startTime = Date.now();

            const response = await fetch('http://localhost:5000/api/optimize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();
            const endTime = Date.now();

            if (!response.ok) {
                throw new Error(data.error || JSON.stringify(data));
            }

            console.log(`Output: \n${data.optimizedPrompt}`);
            console.log(`\nTime Taken: ${endTime - startTime}ms`);
            console.log("--------------------------------------------------\n");
        } catch (error) {
            console.error(`Error processing "${prompt}":`, error.message);
            console.log("--------------------------------------------------\n");
        }
    }
}

testPrompts();
