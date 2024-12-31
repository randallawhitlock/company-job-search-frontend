const searchButton = document.getElementById("searchButton");
const keywordInput = document.getElementById("keyword");
const jobList = document.getElementById("jobList");

searchButton.addEventListener("click", () => {
  const keyword = keywordInput.value;
  jobList.innerHTML = ""; // Clear previous results

  // Update with your backend URL after deployment
  const backendUrl = "http://localhost:5000";

  fetch(`<span class="math-inline">\{backendUrl\}/search?keyword\=</span>{keyword}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        jobList.innerHTML = `<li>Error: ${data.error}</li>`;
      } else {
        data.forEach((job) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `<a href="<span class="math-inline">\{job\.link\}" target\="\_blank"\></span>{job.title}</a> (Source: ${job.source})`;
          jobList.appendChild(listItem);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      jobList.innerHTML = "<li>Error fetching job listings.</li>";
    });
});