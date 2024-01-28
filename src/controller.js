import pdf from 'pdf-creator-node'
import fs from 'fs'


export const showReport = (req, res) => {
    try {
        res.render('index')
    } catch (error) {
        console.log(error)
    }
}

export const showBasic=(req,res)=>{
    res.render('basic')
}

export const showCustom=(req,res)=>{
    res.render('custom')
}

export const quil = (req,res)=>{

    const editorData = req.body.data;
    console.log(editorData)
    console.log(editorData[0])
    res.send(editorData[1])
}

export const generatePdf = async (req, res) => {
    try {
        let pathFile = "./temp"
        let fileName = "output.pdf"
        let fullPath = pathFile + "/" + fileName
        let html = fs.readFileSync("./src/templates/template.html", "utf-8")
        let options = {
            format: "A4",
            orientation: "potrait",
            border: "15mm", //ini padding dari document nya
            header: {
                height: "5mm",
                contents: '<div style = "text-align: right;">Author: fajr</div>'
            },
            footer: {
                height: "20mm",
                contents: {
                    first: "Cover Page",
                    2: "Second page",
                    default:
                        '<span style="color:$444;">{{pages}}</span>/<span>{{pages}}</span>',
                    last: "Last Page"
                }
            }
        }
        const barangs= [
            { no: 1, name: "Paracetamol", qty: 3, harga: 5000, exp: "12-02-2025" },
            { no: 2, name: "Amoxicillin", qty: 2, harga: 9000, exp: "31-01-2026" }
        ]

        let document = {
            html: html,
            data: {barangs},
            path: fullPath,
            type: ""
        }
        const process = await pdf.create(document, options)

        if (process) {
            res.download(fullPath, fileName, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    fs.unlinkSync(fullPath) //hapus temporary di folder temp
                }
            })
        }

    } catch (error) {
        console.log(error)
    }
}

export const customPdf = async (req, res) => {
    try {
        const editorData = req.body.data;
        let pathFile = "./temp"
        let fileName = "output.pdf"
        let fullPath = pathFile + "/" + fileName
        let html = fs.readFileSync("./src/templates/template2.html", "utf-8")
        let options = {
            format: "A4",
            orientation: "potrait",
            border: "15mm", //ini padding dari document nya
            header: {
                height: "5mm",
                contents: '<div style = "text-align: right;">Author: fajr</div>'
            },
            footer: {
                height: "20mm",
                contents: {
                    first: "Cover Page",
                    2: "Second page",
                    default:
                        '<span style="color:$444;">{{pages}}</span>/<span>{{pages}}</span>',
                    last: "Last Page"
                }
            }
        }
        const datas= [
            { data: editorData[0]},
            { data: editorData[1]}
        ]

        let document = {
            html: html,
            data: {datas},
            path: fullPath,
            type: ""
        }
        const process = await pdf.create(document, options)

        if (process) {
            res.download(fullPath, fileName, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    fs.unlinkSync(fullPath) //hapus temporary di folder temp
                }
            })
        }

    } catch (error) {
        console.log(error)
    }
}
