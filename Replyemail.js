document.addEventListener("DOMContentLoaded", function () {
  var generateSummaryBtn = document.getElementById("generateSummaryBtn");

  var generateEmailBtn = document.getElementById("generateEmailBtn");

  var generateSentimentBtn = document.getElementById("generateSentimentBtn");

  generateSummaryBtn.addEventListener("click", function () {
    generateSummary();
  });

  generateSentimentBtn.addEventListener("click", function () {
    generateSentiment();
  });

  generateEmailBtn.addEventListener("click", function () {
    generateEmail();
  });

  function generateSummary() {
    var emailContent = document.getElementById("emailcontent").value;

    const temperatureValue = "0." + document.getElementById("amount").value;

    const temperatureValue1 = parseFloat(temperatureValue);

    var summaryData = {
      messages: [
        {
          role: "system",

          content:
            "Summarize the given conversation by Determining the cause and describe its outcome.## " +
            emailContent +
            " \n Summary :",
        },
      ],

      temperature: temperatureValue1,

      top_p: 0.95,

      frequency_penalty: 0,

      presence_penalty: 0,

      max_tokens: 800,

      stop: null,
    };

    axios
      .post(
        "https://automation-emailgenerator.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-03-15-preview",
        JSON.stringify(summaryData),
        {
          headers: {
            "api-key": "d0774b3c95d4423fbc6085faa0e68c81",

            "Content-Type": "application/json",
          },
        }
      )

      .then(function (summaryResponse) {
        // Handle summary response

        var summary = summaryResponse.data.choices[0].message.content;

        document.getElementById("points").value = summary;

        var sentence = summary.split(". ");

        var bulletPoints = sentence
          .map((sentence) => "* " + sentence.trim())
          .join("\n");

        // Display the summary in the textarea for customer's points to address

        document.getElementById("points").value = bulletPoints;
      })

      .catch(function (error) {
        console.error("Error in summary API request", error);
      });
  }

  function generateSentiment() {
    var emailContent = document.getElementById("emailcontent").value;

    const temperatureValue = "0." + document.getElementById("amount").value;

    const temperatureValue1 = parseFloat(temperatureValue);

    var emailData = {
      messages: [
        {
          role: "system",

          content: `Do sentiment analysis for ${emailContent} and response should  be either neutral, positive or negative`,
        },
      ],

      temperature: temperatureValue1,

      top_p: 0.95,

      frequency_penalty: 0,

      presence_penalty: 0,

      max_tokens: 800,

      stop: null,
    };

    axios
      .post(
        "https://automation-emailgenerator.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-03-15-preview",
        JSON.stringify(emailData),
        {
          headers: {
            "api-key": "d0774b3c95d4423fbc6085faa0e68c81",

            "Content-Type": "application/json",
          },
        }
      )

      .then(function (emailResponse) {
        // Handle email response

        var sentiment = emailResponse.data.choices[0].message.content;

        document.getElementById("score").value = sentiment;

        console.log(sentiment);
      })

      .catch(function (error) {
        console.error("Error in email API request", error);
      });

    // function extractSentiment(text) {
    //   const words = text.toLowerCase().split(" ");

    //   if (words.includes("positive")) {
    //     return "positive";
    //   } else if (words.includes("negative")) {
    //     return "negative";
    //   } else if (words.includes("neutral")) {
    //     return "neutral";
    //   }

    //   return "unknown";
    // }

    // function handleSentimentResponse(sentimentText) {
    //   const sentiment = extractSentiment(sentimentText);

    //   console.log(sentiment);

    //   const sentiment1 = `The sentiment of this email is ${sentiment}`;

    //   document.getElementById("score").value = sentiment1;

    //   console.log(sentiment);
    // }
  }

  function generateEmail() {
    var emailContent = document.getElementById("emailcontent").value;

    const temperatureValue = "0." + document.getElementById("amount").value;

    const temperatureValue1 = parseFloat(temperatureValue);

    var numberOfWords = document.getElementById("numberOfWords").value;

    var ResponseGoal = document.getElementById("response-goal").value;

    console.log(ResponseGoal);

    var emailPrompt =
      "Respond to the customer's email. Address their requests from the following: " +
      emailContent +
      "with Response Goal" +
      ResponseGoal +
      "  within " +
      numberOfWords +
      " words and in temperature " +
      temperatureValue1 +
      "";

    console.log(emailPrompt);

    var emailData = {
      messages: [
        {
          role: "system",

          content: emailPrompt,
        },
      ],

      temperature: temperatureValue1,

      top_p: 0.95,

      frequency_penalty: 0,

      presence_penalty: 0,

      max_tokens: 800,

      stop: null,
    };

    axios
      .post(
        "https://automation-emailgenerator.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-03-15-preview",
        JSON.stringify(emailData),
        {
          headers: {
            "api-key": "d0774b3c95d4423fbc6085faa0e68c81",

            "Content-Type": "application/json",
          },
        }
      )

      .then(function (emailResponse) {
        // Handle email response

        var emailDraft = emailResponse.data.choices[0].message.content;

        document.getElementById("Email-Draft").value = emailDraft;
      })

      .catch(function (error) {
        console.error("Error in email API request", error);
      });
  }
});
