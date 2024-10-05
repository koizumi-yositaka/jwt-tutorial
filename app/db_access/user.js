const pg = require("pg");
const db = process.env.DB_NAME
const user=process.env.DB_USER
const db_pass = process.env.DB_PASS
const db_host = process.env.DB_HOST
const getClient=()=>{
    return new pg.Client({
        database: db,
        user,
        password: db_pass,
        host: db_host,
        port: 5434,
    });
}

const getAllUsers=async ()=>{
    var query = 'SELECT * FROM public."t_user"'
    var client = getClient()
    try{
        await client.connect();
        console.log('Connected to PostgreSQL');
        // SELECTクエリを実行
        const res = await client.query(query);
        // クエリの結果を処理
        console.log('Query result:', res.rows);
        return res
    }catch(err){
        // エラー処理
        console.error('Error executing query', err);
    }finally{
        await client.end();
        console.log('Disconnected from PostgreSQL');
    }
}

const getUserByEmail=async (email)=>{
    var query = 'SELECT * FROM public."t_user" WHERE email=$1'
    var values= [email]
    var client = getClient()
    try{
        await client.connect();
        console.log('Connected to PostgreSQL');
        // SELECTクエリを実行
        const res = await client.query(query,values);
        // クエリの結果を処理
        console.log('Query result:', res.rows);
        return res.rows
    }catch(err){
        // エラー処理
        console.error('Error executing query', err);
    }finally{
        await client.end();
        console.log('Disconnected from PostgreSQL');
    }
}
const createUser=async (name,pass)=>{
    var client = getClient()
    try{

        var text = 'INSERT INTO public."t_user" ("email","password") VALUES($1, $2)'
        var values= [name,pass]
        await client.connect();
        console.log('Connected to PostgreSQL');
        // SELECTクエリを実行
        const res = await client.query(text,values);
        // クエリの結果を処理
        console.log('Query result:', res.rows);
        return res
    }catch(err){
        // エラー処理
        console.error('Error executing query', err);
    }finally{
        await client.end();
        console.log('Disconnected from PostgreSQL');
    }
}

module.exports={getAllUsers,createUser,getUserByEmail}