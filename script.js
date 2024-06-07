document.addEventListener("DOMContentLoaded", function() {
	// 1. Modificarea stilului unui element sau al unui grup de elemente
    document.querySelector('.header-title').style.color = '#FF9DBA'; //schimb culoarea primului element de tip .header-title

    // 2. Manipularea DOM-ului
    // Selectare după ID
	document.getElementById('contact').style.textShadow = '2px 2px 5px rgba(0,0,0,0.3)';

    // Selectare după tag
    const paragraphs = document.getElementsByTagName('p');
    for (let p of paragraphs) {
        p.style.color = 'black';
    }

    // Selectare după clasă
    const headers = document.getElementsByClassName('header-title');
    for (let header of headers) {
        header.style.textAlign = 'center';
    }
	// 3. -> e mai jos, cu cerința 12
	
    // 4. Folosirea și modificarea evenimentelor generate de mouse și tastatură
    document.querySelector('.dropbtn').addEventListener('click', () => {
        alert('Meniu apăsat!');
    });
	
	// Când apăs orice tastă de la tastatură, primesc un mesaj în consolă
    document.addEventListener('keydown', (event) => {
        console.log(`Tasta apăsată: ${event.key}`);
    });

    // 5. Modificare de proprietăți
	document.querySelector('.header-title').style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.3)';

    // 6. Inputuri funcționale - folosit în partea de LogIn LogOut
	
    // 7. Folosirea setTimeout sau setInterval
    setTimeout(() => {
        alert('Ai petrecut 10 secunde pe pagina mea!');
    }, 10000);

    setInterval(() => {
        console.log('Acest mesaj apare la fiecare 4 secunde');
    }, 4000);

    // 8. Folosirea localStorage
    const flowers = ['Zambilă', 'Lalea', 'Bujor', 'Trandafir'];
    localStorage.setItem('flowers', JSON.stringify(flowers));

    const storedFlowers = JSON.parse(localStorage.getItem('flowers'));
    console.log(storedFlowers);

    // 9. Folosirea metodelor din clasele Math, Array, String, Date
    const randomNum = Math.random();
	console.log(`Un număr random: ${Math.round(randomNum*10)}`);
    const upperCaseName = 'deni'.toUpperCase();
	console.log(`Porecla mea este: ${upperCaseName}`);
    const today = new Date();
    console.log(`Data curentă: ${today}`);

    // 10. Schimbarea aleatoare a valorilor unei proprietăți
    const colors = ['#e0517b', '#f5648f', '#f78dac'];
    document.querySelector('.header-title').style.color = colors[Math.floor(Math.random() * colors.length)];

    // 11. Folosirea proprietăților classList, target sau currentTarget
    document.querySelector('.dropbtn').addEventListener('click', (event) => {
        event.target.classList.toggle('active');
    });

	// 3. Crearea și ștergerea de elemente HTML
	// 12. Folosirea metodelor getComputedStyle, stopPropagation
	const buton = document.createElement('buton');
    buton.textContent = 'Schimbă culoarea categoriilor în roz';
    buton.style.cursor = 'pointer';
    buton.style.padding = '10px';
    buton.style.margin = '10px';
    buton.style.border = '1px solid #AA336A';
	buton.style.backgroundColor = '#AA336A'; 
    buton.style.color = 'white'; 
    buton.style.fontFamily = '"Comic Sans MS", "Comic Sans", cursive'; 
    buton.style.borderRadius = '15px';
	buton.style.textAlign = 'center';
	
	const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
	
	container.appendChild(buton);
    document.body.appendChild(container);	
	
	buton.addEventListener('click', (event) => {
		const h2Elements = document.querySelectorAll('h2');
        for (let element of h2Elements)
		{
			element.style.color = '#AA336A';
		}
		const h4Elements = document.querySelectorAll('h4');
        for (let element of h4Elements)
		{
			element.style.color = '#AA336A';
		}
		
        const styles = getComputedStyle(event.target);
        console.log(`Culoarea butonului: ${styles.color}`);
        console.log(`Fundalul butonului: ${styles.backgroundColor}`);
        console.log(`Marginea butonului: ${styles.border}`);
        
        event.stopPropagation();
        buton.remove();
    });
	
    
	//Joc de ghicit numărul
	const jocForm = document.getElementById('jocForm');
	const rezultatDiv = document.getElementById('rezultat');

	jocForm.addEventListener('submit', function(event) {
		event.preventDefault();

		const numarGuess = parseInt(document.getElementById('numarGuess').value);
		const numarRandom = Math.floor(Math.random() * 11); // 0 - 10

		if (numarGuess === numarRandom) {
			rezultatDiv.textContent = "Ai ghicit numărul!";
		} else {
			rezultatDiv.textContent = `Nu ai ghicit numărul... Numărul secret era: ${numarRandom}`;
		}
});

	//LogIn LogOut
	const loginForm = document.getElementById('loginForm');
    const dashboardSection = document.getElementById('dashboard');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const logoutButton = document.getElementById('logoutButton');

	// Cereri AJAX - preluare date din fișier JSON
    async function getUsers() {
        const response = await fetch('users.json');
        const data = await response.json();
        return data;
    }

    function checkLogin() {
        const user = localStorage.getItem('user');
        if (user) {
            const userObj = JSON.parse(user);
            loginForm.style.display = 'none';
            dashboardSection.style.display = 'block';
            usernameDisplay.textContent = userObj.username;
        } else {
            loginForm.style.display = 'block';
            dashboardSection.style.display = 'none';
        }
    }

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validarea datelor dintr-un formular folosind expresii regulate
        if (!regex.test(email)) {
            alert('Email invalid');
            return;
        }

        try {
            const users = await getUsers();
            const user = users.find(u => u.username === username && u.parola === password);
            if (user) {
                localStorage.setItem('user', JSON.stringify({ username: user.username }));
                checkLogin();
            } else {
                alert('Username or password is incorrect');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('user');
        checkLogin();
    });

    checkLogin();

});

	




