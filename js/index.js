const form = document.querySelector("#github-form")
form.addEventListener("submit", (event) => {

event.preventDefault()

/*Data we want to pass from the form
event.target[0].value */

fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
.then(response => response.json())
.then(response => {
const userList = document.querySelector('#user-list')
const reposList = document.getElementById("repos-list")
reposList.innerHTML = ""
userList.innerHTML = ""
// login, avatar_url, url
// console.log("login", response)
// console.log("login", response.items[1].login)

response.items.map(item => {


const li = document.createElement("li")
    
// Login
const h2 = document.createElement("h2")
h2.textContent = item.login
h2.addEventListener("click", e => showUserRepos(item.login, e))

// Image
const img = document.createElement("img")
img.src = item.avatar_url

//url
// const a = document.createElement("a")
// a.herf = item.url
// a.innerText = "Profile"


// Append

li.append(h2, img,)
userList.append(li)
  })
//   event.target[0].value = ""
 })
 form.reset()
})

function showUserRepos(username, e) {
    const reposList = document.getElementById("repos-list")
    reposList.innerHTML = ""

    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(response => response.map(repo => {

        
        const li = document.createElement("li")

        const h1 = document.createElement("h1")
        h1.textContent = repo.name
        
        
        li.append(h1)
        reposList.append(li)
    }))
}