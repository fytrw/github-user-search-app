import './dayjs.min.js'

const searchBtn = document.querySelector('.search-button');
const input =  document.querySelector('input');
const picture = document.querySelector('.profile-picture');
const accountName = document.querySelector('.account-name');
const joined = document.querySelector('.joined span');
const loginName = document.querySelector('.username')
const bio = document.querySelector('.bio');
const repos = document.querySelector('.repos span');
const followers = document.querySelector('.followers span');
const following = document.querySelector('.following span');
const address = document.querySelector('.address span');
const twitter = document.querySelector('.twitter span');
const website = document.querySelector('.website span');
const work = document.querySelector('.work span');
const darkModeBtn = document.querySelector('.dark-mode');
const root = document.querySelector(':root');
let flagMode = true;


function loadUser(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then(res => {
            if (!res.ok) {
                document.querySelector('.error').style.display = "block";
                throw new Error('wrong name');
            } else {
                document.querySelector('.error').style.display = "none";
            }
            return res.json();
        })
        .then(result => {
            picture.src = result.avatar_url;
            accountName.textContent = result.name ? result.name : result.login;
            joined.textContent = dayjs(result.created_at).format("D MMM YYYY");
            loginName.textContent = `@${result.login}`;
            bio.textContent = checkBio(result.bio, bio);
            repos.textContent = result.public_repos;
            followers.textContent = result.followers;
            following.textContent = result.following;
            address.textContent = checkAvailable(result.location, address);
            twitter.textContent = checkAvailable(result.twitter_username, twitter);
            website.textContent = checkAvailable(result.blog, website);
            work.textContent = checkAvailable(result.company, work);
        });
}

loadUser('octocat');

const checkAvailable = (result, span)=> {
    if(!result){
        span.parentElement.classList.add('error');
        return 'Not Available'
    }
    span.parentElement.classList.remove('error');
    return result 
}
const checkBio = (result, bio)=> {
    if(!result){
        bio.classList.add('error');
        return 'This profile has no bio.'
    }
    bio.classList.remove('error');
    return result 
}

const changeMode = () => {
    if(flagMode){
        flagMode = !flagMode;
        root.style.setProperty('--body-background', '#141D2F');
        root.style.setProperty('--element-background', '#1E2A47');
        root.style.setProperty('--text-second', '#FFFFFF');
        root.style.setProperty('--text', '#FFFFFF');
        root.style.setProperty('--gray', '#FFFFFF');
        darkModeBtn.innerHTML = `light <img src="assets/icon-sun.svg" alt="" class="icon">`;
        darkModeBtn.classList.add('light');
        
    } else {
        flagMode = !flagMode;
        root.style.setProperty('--body-background', '#F6F8FF');
        root.style.setProperty('--element-background', '#FEFEFE');
        root.style.setProperty('--text-second', '#2B3442');
        root.style.setProperty('--text', '#4B6A9B');
        root.style.setProperty('--gray', '#697C9A');
        darkModeBtn.innerHTML = `dark <img src="assets/icon-moon.svg" alt="" class="icon">`;
        darkModeBtn.classList.remove('light');

    }
}

darkModeBtn.addEventListener('click', changeMode);

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loadUser(input.value)
});