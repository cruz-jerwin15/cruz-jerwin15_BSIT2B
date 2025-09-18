const express = require('express');
const app = express();
const port =3001;
const pool = require('./db')

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('This home');
});
// Get all records
app.get('/students',async(req,res)=>{
    try{
        const [rows] = await pool.query(`SELECT * FROM tbl_students`);
        res.json(rows)
    }catch(err){
        console.log('We fetching users',err)
        res.status(500).send('Error fetching user');
    }
});

// Get single data
app.get('/students/:id',async(req,res)=>{
    const userId = req.params.id;
    try{
        const [rows] = await pool.query(`SELECT * FROM tbl_students WHERE id=${userId}`);
        res.json(rows[0])
    }catch(err){
        console.log('We fetching users',err)
        res.status(500).send('Error fetching user');
    }
});

// ADd records
app.post('/students', async (req, res) => {
     try {
        const { name, course } = req.body;
        let status="ACTIVE";
         const query = `INSERT INTO tbl_students (name, course,status) VALUES ('${name}','${course}','${status}')`;
         const sql = await pool.execute(query);
        res.status(200).send({message:'Success'});
     }catch(err){
         res.status(500).send({message:'Error'});
     }
   
    
    });

app.listen(port,()=>{
    console.log('Server running in port '+port)
})
