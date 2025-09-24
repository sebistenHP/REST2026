const express = require("express"); //Express importálása
const app = express(); //Express példányosítása
const port = 3000; //Port beállítása

//Middleware - köztes alkalmazások
app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]


//GET végpont egy szöveges üzenet visszaküldésre
app.get('/hello', (req, res) => {
    res.send("Hello itt az Express webszerver!");
})

app.get('/api.courses', (req, res) => {
    res.json(courses);
})

app.get('/api.courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('A megadott azonosítóval nem található kurzus!');
    res.json(course);
})

app.post('/api.courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name};
    courses.push(course);
    res.status(200).json({message: "Új elem hozzáadva!", data: req.body});
})

app.delete('/api.courses/:id' , (res,req) => {
    const course = courses.find(c =>c.id === parseInt(req.params.id));
     if (!course) res.status(404).send('A megadott id_vel nem létezik kurzus!');
     const index = courses.indexOf(course);
     courses.splice(index, 1);
     res.status(200).json({message: "Kurzus törölve!", data: course});
     
})

//A webszerver elindítása
app.listen(port, () => {
    console.log(`A webszerver figyel a localhost:${port} webcímen`);
})