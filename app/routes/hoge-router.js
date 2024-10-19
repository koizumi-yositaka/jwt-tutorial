const checkToken= require("../middleware/check_jwt")


const router = require("express").Router()

router.get("",[checkToken],(req,res)=>[
    res.status(200).send([
        {
            title: 'Breaking News: React Styled Components in Action!',
            content: 'Styled-components allows you to write plain CSS in your JavaScript, providing a great way to style your components effectively.',
            imageUrl: 'https://via.placeholder.com/600x400',
            date: 'October 12, 2024'
        }
    ])
])

module.exports=router