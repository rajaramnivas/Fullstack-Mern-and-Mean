const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('./models/student');
const path = require('path');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://rajarams24mca:rajaram@cluster0.8lga3dx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('form', { student: null });
});

app.post('/add', async (req, res) => {
  const { name, email, age, department } = req.body;
  await Student.create({ name, email, age, department });
  res.redirect('/students');
});

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.render('students', { students });
});

app.get('/edit/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render('form', { student });
});

app.post('/update/:id', async (req, res) => {
  const { name, email, age, department } = req.body;
  await Student.findByIdAndUpdate(req.params.id, { name, email, age, department });
  res.redirect('/students');
});

app.get('/delete/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/students');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
