const session = require('express-session');
var express = require('express');
var formidable = require('formidable');
var app = express();
const fs = require('fs');

app.set('view engine', 'ejs');

app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false,
}));

function verifica(user, parola)
{
	if (fs.existsSync("users.json")){
           var date = fs.readFileSync("users.json");
           var ob = JSON.parse(date);
        }
	for (let i = 0; i<ob.length; i++)
	{
		if (ob[i].username == user && ob[i].parola == parola)
		{
			return user;}
	}
	return false;
}

app.post('/login', function(req, res) {
   var form = new formidable.IncomingForm();
   form.parse(req, function(err, fields, files) {
        user =  verifica(fields.username, fields.parola);
        // verificarea datelor de login
        
        if(user){
          req.session.username = user; 
          // setez userul ca proprietate a sesiunii
          res.redirect('/logat'); }
        else{
		req.session.username = false;
		res.redirect('/'); //nu sunt sigura
		}
   });
});





//ASTA E DE PE CHATGPT

app.post('/validate-email', function (req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const { email } = JSON.parse(body);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(email)) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});








app.get('/logat', function(req, res) {
   res.render('pagini/logout',{'nume':req.session.username});
});

app.get('/logout', function(req, res) {
   req.session.destroy(); 
   // distrugem sesiunea la intrarea pe pagina de logout
   res.render('pagini/log');
});  

app.get("/", function(req, res){
	res.render('pagini/log');
});

app.listen(4000);

