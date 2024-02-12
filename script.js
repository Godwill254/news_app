const apiKey = 'e98aeda8fe414a0d8c24c832b60ee469';

const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }
    catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

// Function for creating a blog Card
function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        // Creates the blog card 
        const blogCard = document.createElement("div");
        blogCard.classList.add('blog-card');

        // Creates the image and alt text for the blog card
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        // Creates the title for the blog card
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + '...' : article.title
        title.textContent = truncatedTitle;

        // Creates the paragraph for the blog card
        const description = document.createElement("p");
        const truncatedDesc = article.description.length > 100? article.description.slice(0, 100) + '...' : article.description
        description.textContent = truncatedDesc;

        // Assigning the new data to the main element
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', ()=>{
            window.open(article.url, "_blank")
        })
        blogContainer.appendChild(blogCard);

    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);

    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();