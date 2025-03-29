document.getElementById("create_account_button").addEventListener("click", async function(event) {
    console.log("123")
    event.preventDefault();

    const username = document.querySelector("input[type='text']").value;
    const password = document.querySelector("input[type='password']").value;

    const response = await fetch("https://cloud-based-notes-lime.vercel.app/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            pword: password
        })
    });
})

document.getElementById("login").addEventListener("click", async function(event) {
    console.log("Trying login")
    event.preventDefault();

    const username = document.querySelector("input[type='text']").value;
    const password = document.querySelector("input[type='password']").value;

    const response = await fetch("https://cloud-based-notes-lime.vercel.app/api/find_account", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    
    const responseBody = await response.text();
    if (responseBody == "1") {
        console.log("Valid")
        window.location.href = "app.html";
    }
})