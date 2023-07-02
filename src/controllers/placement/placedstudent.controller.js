const db = require("../../utils/mongooseMethods");
const dbModels = require("../../utils/modelName");
const HelperUtils = require("../../utils/helper");
const { ERROR_MSG } = require("../../utils/const")

exports.placedStudentCreatenEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            let placedStudent = await db.findOne({
                collection: dbModels.PlacedStudent,
                query: { name: req.body.name }
            })
            if (placedStudent) {
                res.send(HelperUtils.error("Already Exists", {}));
                return;
            }
            let newPlacedStudent = await db.insertOne({
                collection: dbModels.PlacedStudent,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newPlacedStudent));
        } else {
            let id = req.body._id;
            delete req.body._id;
            let updated = await db.findOneAndUpdate({
                collection: dbModels.PlacedStudent,
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


exports.placedStudentById = async (req, res) => {
    try {
        console.log(req.params.id)
        let placedStudentObj = await db.findOne({
            collection: dbModels.PlacedStudent,
            query: { _id: req.params.id },

        })
        if (placedStudentObj && placedStudentObj.status) placedStudentObj.status = {
            label: placedStudentObj.status,
            value: placedStudentObj.status
        }

        res.send(HelperUtils.success("Successfully get Placed Student", placedStudentObj));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));
    }
}



exports.placedStudentDelete = async (req, res) => {
    try {
        //first check available in system
        let placedStudent = await db.findOne({
            collection: dbModels.PlacedStudent,
            query: { _id: req.params.id }
        });
        if (!placedStudent) {
            res.send(HelperUtils.error("PlacedStudent Not Found", {}));
            return;
        }
        await db.updateOne({
            collection: dbModels.PlacedStudent,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted Placed Student", {}));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));

    }
}



exports.placedStudentList = async (req, res) => {
    try {
        let query = { isDel: false }

        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, 'i')

        let result = await db.paginate({
            collection: dbModels.PlacedStudent,
            query: query,
            options: {
                populate: [
                    { path: "course" },
                    { path: "center" },
                    { path: "image" },
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