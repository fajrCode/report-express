import express from 'express'
import pdf from 'pdf-creator-node'
import fs from 'fs'

const router = express.Router()

const showReport = (req, res)=>{
    try {
        res.render('index')
    } catch (error) {
        console.log(error)
    }
}

const generatePdf = (req,res)=>{
    try {
        let pathFile = "./file-output"
        let fileName = "output.pdf"
        let fullPath = pathFile+"/"+fileName
        let html = fs.readFileSync("./src/templates/template.ejs", "utf-8")
        let options = {
            format: "A4",
            orientation: "potrait",
            border: "10mm",
            header: {
                height: "28mm",
                contents: '<div style = "text-align: center;>Author: fajr</div>'
            },
            footer:{
                height: "28mm",
                contents: {
                    first: "Cover page",
                    2: "Second page",
                    default:
                        '<span style="color:$444;">{{pages}}</span>/<span>{{pages}}</span>',
                    last: "Last Page"
                }
            }
        }

    } catch (error) {
        console.log(error)
    }
}

router.route('/').get(showReport)

export default router