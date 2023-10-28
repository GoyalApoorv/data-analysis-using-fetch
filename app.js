const url = 'https://one00x-data-analysis.onrender.com/assignment?email=apoorvgoyal1212@gmail.com';

const fetchData = async () => {
    const response = await fetch(url);
    return response;
}

const postData = async (assignmentId, answer) => {
    const postUrl = 'https://one00x-data-analysis.onrender.com/submit';
    const postResponse = await fetch(postUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ assignment_id: assignmentId, answer: answer })
    });
    return postResponse;
};

const findMostUsedword = (data) => {
    const frequencyMap = {};
    let maxCount = 0;
    let mostFrequentWord = null;

    data.forEach((word) => {
        frequencyMap[word] = frequencyMap[word] ? frequencyMap[word] + 1 : 1;
        if (frequencyMap[word] > maxCount) {
            maxCount = frequencyMap[word];
            mostFrequentWord = word;
        }
    });

    return mostFrequentWord;
};

const run = async () => {
    try {
        const response = await fetchData();
        if (response.status === 200) {
            const assignmentId = response.headers.get("X-Assignment-ID");
            const data = await response.json();
            const mostUsed = findMostUsedword(data);
            const postResponse = await postData(assignmentId, mostUsed);
            const result = await postResponse.json();
            console.log(result);
        } else if (response.status === 500) {
            console.log("HTTP 500 Error! Please retry.")
        }
    } catch (error) {
        console.error("Error", error);
    }
};

run();
