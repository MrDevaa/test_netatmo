function fetchUserData(results = 10) {
    const url = `https://randomuser.me/api/?results=${results}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayUserCards(data.results);
            filterByGender();
            sortByDateOfBirth();
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
}

function displayUserCards(users) {
    const userCardsContainer = document.getElementById('user-cards');

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        const userImage = document.createElement('img');
        userImage.src = user.picture.large;

        const userName = document.createElement('h2');
        userName.textContent = `${user.name.first} ${user.name.last}`;

        const userAge = document.createElement('p');
        userAge.textContent = `Age: ${user.dob.age}`;

        userCard.dataset.gender = user.gender;

        userCard.dataset.dob = user.dob.date;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => deleteUserCard(userCard));
        userCard.appendChild(deleteButton); 

        userCard.appendChild(userImage);
        userCard.appendChild(userName);
        userCard.appendChild(userAge);

        userCardsContainer.appendChild(userCard);
    });
}

function addTenUsers() {
    fetchUserData(10); 
}

document.getElementById('add-users-btn').addEventListener('click', addTenUsers);


function deleteUserCard(card) {
    card.remove();
}

function filterByGender() {
    const selectedGender = document.querySelector('input[name="gender"]:checked').value;
    const userCards = document.querySelectorAll('.user-card');

    userCards.forEach(card => {
        if (selectedGender === 'all' || card.dataset.gender === selectedGender) {
            card.style.display = 'block'; 
        } else {
            card.style.display = 'none'; 
        }
    });
}

document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener('change', filterByGender);
});

function sortByDateOfBirth() {
    const userCardsContainer = document.getElementById('user-cards');
    const userCards = Array.from(userCardsContainer.querySelectorAll('.user-card'));

    userCards.sort((cardA, cardB) => {
        const dobA = new Date(cardA.dataset.dob);
        const dobB = new Date(cardB.dataset.dob);
        return dobA - dobB;
    });

    userCards.forEach(card => {
        userCardsContainer.appendChild(card);
    });
}

document.getElementById('sort-by-dob-btn').addEventListener('click', sortByDateOfBirth);

fetchUserData();