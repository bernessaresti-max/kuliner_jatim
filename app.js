const API_URL = "https://691e982cbb52a1db22be5c48.mockapi.io/Reviewkuliner";

async function loadReviews() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = document.getElementById("reviews-list");
    list.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "review-card";

        const stars = "⭐".repeat(item.rating);

        div.innerHTML = `
            <h3>${item.food} — <small>${item.place}, ${item.city}</small></h3>
            <div class="rating-stars">${stars}</div>
            <p><strong>${item.name}</strong></p>
            <p>${item.review}</p>
        `;

        list.appendChild(div);
    });
}

async function addReview() {
    const name = document.getElementById("name").value;
    const food = document.getElementById("food").value;
    const place = document.getElementById("place").value;
    const city = document.getElementById("city").value;
    const rating = document.getElementById("rating").value;
    const review = document.getElementById("review").value;

    if (!name || !food || !place || !city || !rating || !review) {
        alert("Isi semua kolom!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, food, place, city, rating, review })
    });

    document.getElementById("name").value = "";
    document.getElementById("food").value = "";
    document.getElementById("place").value = "";
    document.getElementById("city").value = "";
    document.getElementById("rating").value = "";
    document.getElementById("review").value = "";

    loadReviews();
}

loadReviews();
