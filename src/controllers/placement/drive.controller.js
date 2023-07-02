const db = require("../../utils/mongooseMethods");
const dbModels = require("../../utils/modelName");
const HelperUtils = require("../../utils/helper");
const { ERROR_MSG } = require("../../utils/const")

exports.driveCreateEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            let drive = await db.findOne({
                collection: dbModels.Drive,
                query: { name: req.body.name }
            })
            if (drive) {
                res.send(HelperUtils.error("Already Exists", {}));
                return;
            }
            let newDrive = await db.insertOne({
                collection: dbModels.Drive,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newDrive));
        } else {
            let id = req.body._id;
            delete req.body._id;
            let updated = await db.findOneAndUpdate({
                collection: dbModels.Drive,
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


exports.driveById = async (req, res) => {
    try {
        console.log(req.params.id)
        let driveObj = await db.findOne({
            collection: dbModels.Drive,
            query: { _id: req.params.id },

        })
        if (driveObj && driveObj.status) driveObj.status = {
            label: driveObj.status,
            value: driveObj.status
        }

        res.send(HelperUtils.success("Successfully get Course", driveObj));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));
    }

}



exports.driveDelete = async (req, res) => {
    try {
        //first drive available in system
        let drive = await db.findOne({
            collection: dbModels.Drive,
            query: { _id: req.params.id }
        });
        if (!drive) {
            res.send(HelperUtils.error("Drive Not Found", {}));
            return;
        }
        await db.updateOne({
            collection: dbModels.Drive,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted drive", {}));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));

    }
}



exports.driveList = async (req, res) => {
    try {
        let query = { isDel: false }

        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, 'i')

        let result = await db.paginate({
            collection: dbModels.Drive,
            query: query,
            options: {
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