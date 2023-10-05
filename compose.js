document.addEventListener('DOMContentLoaded', function() {
    // Function to generate email content using the API
    function generateEmail() {
        // Get purpose from the textarea
        const purpose = document.getElementById('purpose').value;

        // Get number of words from the select box
        const numberOfWords = document.getElementById('numberOfWords').value;
        console.log(numberOfWords)

        // Get temperature from the slider
        const  temperatureValue = "0."+document.getElementById('amount').value;
console.log(temperatureValue);
const temperatureValue1 = parseFloat(temperatureValue);
console.log(temperatureValue); 
        // Prepare the API request data for generating email
        let emailData = {
            "messages": [{
                "role": "system",
                "content": `Compose email with ${purpose} purpose+ professional tone with ${numberOfWords} words`
            }],
            "temperature": temperatureValue1,
            "top_p": 0.95,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "max_tokens": 800,
            "stop": null
        };
console.log(emailData)
        let emailConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://automation-emailgenerator.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-03-15-preview',
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'd0774b3c95d4423fbc6085faa0e68c81'
            },
            data: JSON.stringify(emailData)
        };

        // API request to generate email
        axios.request(emailConfig)
            .then((emailResponse) => {
                // Handle the email API response here
                const suggestedEmailDraft = emailResponse.data.choices[0].message.content;

                // Display the suggested email draft in the textarea
                document.getElementById('suggestedEmailDraft').value = suggestedEmailDraft;
            })
            .catch((error) => {
                // Handle email API errors here
                console.error(error);
            });
    }

    // Function to generate summary using the API
    function generateSummary() {
        // Get the suggested email draft
        const emailDraft = document.getElementById('suggestedEmailDraft').value;
        console.log(emailDraft)

        // Get temperature from the slider
        const  temperatureValue = "0."+document.getElementById('amount').value;
        console.log(temperatureValue);
        const temperatureValue1 = parseFloat(temperatureValue);
        console.log(temperatureValue); 
        // Prepare the API request data for generating summary
        let summaryData = {
            "messages": [
                {
                    "role": "system",
                    "content": "Summarize the given email: " + emailDraft + " \n Summary:"
                }
            ],
            "temperature": temperatureValue1,
            "top_p": 0.95,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "max_tokens": 800,
            "stop": null
        };
console.log(summaryData)   ;
     let summaryConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://automation-emailgenerator.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-03-15-preview',
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'd0774b3c95d4423fbc6085faa0e68c81'
            },
            data: JSON.stringify(summaryData)
        };

        // API request to generate summary
        axios.request(summaryConfig)
            .then((summaryResponse) => {
                // Handle the summary API response here
                const summary = summaryResponse.data.choices[0].message.content;

                var sentence = summary.split('. ');
                var bulletPoints = sentence.map(sentence => "* " + sentence.trim()).join('\n');

                // Display the summary in the textarea for customer's points to address
                document.getElementById('customerPoints').value = bulletPoints;
            })
            .catch((error) => {
                // Handle summary API errors here
                console.error(error);
            });
    }

    // Add event listener to the Generate Email button
    const generateEmailBtn = document.getElementById('generateEmailBtn');
    if (generateEmailBtn) {
        generateEmailBtn.addEventListener('click', generateEmail);
    } else {
        console.error("Element with ID 'generateEmailBtn' not found in the DOM.");
    }

    // Add event listener to the Generate Summary button
    const generateSummaryBtn = document.getElementById('generateSummaryBtn');
    if (generateSummaryBtn) {
        generateSummaryBtn.addEventListener('click', generateSummary);
    } else {
        console.error("Element with ID 'generateSummaryBtn' not found in the DOM.");
    }
});
