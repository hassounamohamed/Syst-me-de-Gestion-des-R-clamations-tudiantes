const express = require('express');
const mysql = require('mysql');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

// Configuration Handlebars
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: {
    formatDate: (date) => new Date(date).toLocaleDateString('fr-FR')
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reclamation'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connecté à la base de données');
});

// Routes
app.get('/formulaire/nouveau', (req, res) => {
  res.render('formulaire', { error: null, formData: null });
});

app.post('/reclamation', (req, res) => {
  const { num_cart, code, nom, prenom, reclamation } = req.body;
  
  // Validation simple
  if (!num_cart || !code || !nom || !prenom || !reclamation) {
    return res.render('formulaire', {
      error: 'Tous les champs sont obligatoires',
      formData: req.body
    });
  }

  // Vérification du code dans la base
  const sql = 'SELECT * FROM reclamation WHERE num_cart = ? AND code = ?';
  db.query(sql, [num_cart, code], (err, results) => {
    if (err) throw err;
    
    if (results.length === 0) {
      return res.render('formulaire', {
        error: 'Code incorrect ou carte inexistante',
        formData: req.body
      });
    }

    // Si le code est bon, enregistrer la réclamation
    const insertSql = 'INSERT INTO reclamation SET ?';
    db.query(insertSql, {
      num_cart,
      nom,
      prenom,
      reclamation,
      code
    }, (err) => {
      if (err) throw err;
      res.redirect('/reclamation?success=1');
    });
  });
});

app.get('/reclamation', (req, res) => {
  db.query('SELECT * FROM reclamation ORDER BY id DESC', (err, results) => {
    if (err) throw err;
    res.render('reclamation', { 
      reclamations: results,
      success: req.query.success === '1'
    });
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});