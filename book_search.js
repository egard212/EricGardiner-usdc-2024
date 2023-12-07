/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

function findSearchTermInBooks(searchTerm, scannedTextObj) {

    // Initialize an empty object to return if the search Term is not found
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    // Check if the input Object is empty, if so just return an empty object and
    // the search term back to the user
    if ((scannedTextObj.length == 0) || (searchTerm === "") || (searchTerm === " ")) {
        return result;
    }

    // Iterate through each book
    for (var book of scannedTextObj) {
        // iterate through each page
        for (var page = 0; page < book.Content.length; page ++) {
            // Create regular expression to search thrugh the substring
            let regex = new RegExp(`\\b${searchTerm}\\b`);

            if (book.Content[page]["Text"].search(regex) !== -1) {

                result["Results"].push({"ISBN": book["ISBN"], "Page": book.Content[page]["Page"], "Line": book.Content[page]["Line"] });

            } else if ((book.Content[page]["Text"].charAt(book.Content[page]["Text"].length - 1) == "-") && ((page + 1) <=  book.Content.length - 1) ) {
                // Check if the last character in the string is a hyphen and that there are still more lines on the page
                // Splitting strings by whitespace
                const currentPageSubstring = book.Content[page]["Text"].split(/\s+/);
                const NextPageSubstring = book.Content[page + 1]["Text"].split(/\s+/);

                // Getting the last element of currentPageSubstring without the hyphen
                const lastElementCurrentPage = currentPageSubstring[currentPageSubstring.length - 1].replace(/-/g, '');

                // Getting the first element of NextPageSubstring
                const firstElementNextPage = NextPageSubstring[0];

                // Concatenating the two substrings
                const concat_result = lastElementCurrentPage + firstElementNextPage;
                // If it's found, append it to the results
                if (concat_result === searchTerm) {
                    result["Results"].push({"ISBN": book["ISBN"], "Page": book.Content[page]["Page"], "Line": book.Content[page]["Line"] });
                }
            }
        }
    }

     
    return result; 
}

/*********************************** Input Objects *************************************************************/
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]



const booksIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Wuthering Heights",
        "ISBN": "12345678910111",
        "Content": [
            {
                "Page": 14,
                "Line": 2,
                "Text": "He's more myself than I am."
            },
            {
                "Page": 15,
                "Line": 9,
                "Text": "Whatever our souls are made of, his and mine are the same."
            },
            {
                "Page": 16,
                "Line": 10,
                "Text": "I gave him my heart, and he took and pinched it to death"
            } 
        ] 
    }
]

    
/*********************************** Output Objects *************************************************************/
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

// Result of a query that wasn't found or was improper in some way
const emptyObjectOut = {
    "SearchTerm": "albatross",
    "Results": []
}

// Result of a query that wasn't found or was improper in some way
const emptyObjectOut2 = {
    "SearchTerm": "",
    "Results": []
}

// Result of a query that wasn't found or was improper in some way
const emptyObjectOut3 = {
    "SearchTerm": "like",
    "Results": []
}

// Result of the booksIn Test
const booksOut = {
    "SearchTerm": "he",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        },
        {
            "ISBN": "12345678910111",
            "Page": 16,
            "Line": 10
        }
    ]
}

// Result of looking for search term that included punctuation (such as an apostrophe or comma)
const apostropheOut = {
    "SearchTerm": "Canadian's",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const commaOut = {
    "SearchTerm": "were",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
}

const hyphenOut = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}


/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** Check that when a search term is not found, an object with an empty results array is returned */
const test3result = findSearchTermInBooks("albatross", twentyLeaguesIn);
if (JSON.stringify(emptyObjectOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", emptyObjectOut);
    console.log("Received:", test3result);
}

/** Check that when multiple lines contain the search term, multiple objects are returned in the Results array */
const test4result = findSearchTermInBooks("he", booksIn);
if (JSON.stringify(booksOut) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", booksOut);
    console.log("Received:", test4result);
}

/** Check that when an empty string is passed to a function, an object with an empty results array is returned  */
const test5result = findSearchTermInBooks("", twentyLeaguesIn);
if (JSON.stringify(emptyObjectOut2) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", emptyObjectOut2);
    console.log("Received:", test5result);
}

/** Check that when an empty object is passed to a function, an object with an empty results array is returned  */
const test6result = findSearchTermInBooks("like", []);
if (JSON.stringify(emptyObjectOut3) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", emptyObjectOut3);
    console.log("Received:", test6result);
}

/** Check that a word with an apostrophe was found */
const test7result = findSearchTermInBooks("Canadian's", twentyLeaguesIn);
if (JSON.stringify(apostropheOut) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", apostropheOut);
    console.log("Received:", test7result);
}

/** Check that a word split by a hyphen and on different lines is found */
const test8result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(hyphenOut) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", hyphenOut);
    console.log("Received:", test8result);
}