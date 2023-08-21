import yup from 'yup'


const cuenta = yup.object({
 
    userName: yup.string().trim().required().min(4),
    password: yup.string().required().min(4)
   
})

export {
    cuenta
}
