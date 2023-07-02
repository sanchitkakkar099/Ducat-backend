
const db = require("../utils/mongooseMethods");
const dbModels = require("../utils/modelName");
const HelperUtils = require("../utils/helper");
const { ERROR_MSG } = require("../utils/const")

exports.constusCreateEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            let contactus = await db.findOne({
                collection: dbModels.ContactUs,
                query: { name: req.body.name }
            })
            if (contactus) {
                res.send(HelperUtils.error("Already Exists", {}));
                return;
            }
            let newContactUs = await db.insertOne({
                collection: dbModels.ContactUs,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newContactUs));
        } else {
            let id = req.body._id;
            delete req.body._id;
            let updated = await db.findOneAndUpdate({
                collection: dbModels.ContactUs,
                query: { _id: id },
                update: req.body,
                options: {
                    new: true
                }
            })
            res.send(HelperUtils.success("Updated", updated));
            return
        }
    } catch (error) {
        res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}


exports.conatctusById = async (req, res) => {
    try {
        console.log(req.params.id)
        let contactusObj = await db.findOne({
            collection: dbModels.StudentRegisteration,
            query: { _id: req.params.id },
            populate: [
                { path: "course" },
                { path: "center" },
            ]
        })
        if (contactusObj && contactusObj.status) contactusObj.status = {
            label: contactusObj.status,
            value: contactusObj.status
        }

        res.send(HelperUtils.success("Successfully get contact", contactusObj));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));
    }

}



exports.contactusDelete = async (req, res) => {
    try {
        //first check available in system
        let contactUs = await db.findOne({
            collection: dbModels.ContactUs,
            query: { _id: req.params.id }
        });
        if (!contactUs) {
            res.send(HelperUtils.error("Contact Us Not Found", {}));
            return;
        }
        await db.updateOne({
            collection: dbModels.ContactUs,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted ConatctUs", {}));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}



exports.contactUslist = async (req, res) => {
    try {
        let query = { isDel: false }

        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, 'i')

        let result = await db.paginate({
            collection: dbModels.ContactUs,
            query: query,
            options: {
                populate: [
                    { path: "course" },
                    { path: "center" },
                ],
                page: (req.body.page) ? req.body.page : 1,
                limit: (req.body.limit) ? req.body.limit : 10,
                sort: { order_no: 1 }
            }
        })
        res.send(HelperUtils.success("Successfully get list", result));
        return
    } catch (error) {
        return HelperUtils.errorRes(res, ERROR_MSG, error.message)
    }
}