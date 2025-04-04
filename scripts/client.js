document.getElementById("create_account_button").addEventListener("click", async function(event) {
    console.log("123")
    event.preventDefault();

    const username = document.querySelector("input[type='text']").value;
    const password = document.querySelector("input[type='password']").value;
    const messageElement = document.getElementById("message");

    const response = await fetch("https://cloud-based-notes-lime.vercel.app/api/create_login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            pword: password
        })
    });

    if (response.ok) {
        messageElement.textContent = "Account created successfully!";
        messageElement.style.display = "block";
    }
    else {
        messageElement.textContent = "Error creating account.";
        messageElement.style.color = "red";
        messageElement.style.display = "block";
    }

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

    const data = await response.json();
    
    if (response.ok) {
        console.log("Valid")
        localStorage.setItem("user_id", data.user_id);
        window.location.href = "app.html";
    }
})
