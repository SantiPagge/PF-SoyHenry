const{getAllCompanyControllers,
    createNewCompanyControllers,
    putCompanyControllers,
    getCompanyByIdControllers,
    deleteCompanyControllers,
    }=require('../controllers/companyControllers')


const allCompany = async (req, res) => {
    try {
        const company = await getAllCompanyControllers()
        return res.status(200).json(company)
        
    } catch (error) {
        res.status(404).json( error )
    }
}
//el post
const newCompany = async (req, res) => {
    try {
        const company = await createNewCompanyControllers(req.body)
        return res.status(200).json( company )
        
    } catch (error) {
        res.status(404).json( error )
    }
}


const companyById= async (req, res) => {
    try {
        const dataApi = await getCompanyByIdControllers(req.params)
        return res.status(200).json(dataApi)
        
    } catch (error) {
        res.status(404).json(error)
    }
}

//el put no modifica
const putCompany = async (req, res) => {
    try {
        const data = await  putCompanyControllers (req.params, req.body)
       return  res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}

const deleteCompany = async (req, res) => {
    try {
        const data = await deleteCompanyControllers(req.params)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports={
    allCompany,
    newCompany,
    companyById,
    putCompany,
    deleteCompany,

}