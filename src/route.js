import express from 'express'
import * as ctrl from './controller.js'

const router = express.Router()

router.route('/').get(ctrl.showReport)
router.route('/basic').get(ctrl.showBasic)
router.route('/custom').get(ctrl.showCustom)
router.route('/quil').post(ctrl.quil)
router.route('/pdf').post(ctrl.generatePdf)
router.route('/customPdf').post(ctrl.customPdf)

export default router