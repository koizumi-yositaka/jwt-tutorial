const {z} = require("zod")
const userSchema = z.object({
    name:z.string().email(),
    pass:z.string().min(6,"6文字以上で入力")
})

module.exports=userSchema