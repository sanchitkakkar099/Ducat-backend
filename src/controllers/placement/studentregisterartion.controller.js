
const db = require("../../utils/mongooseMethods");
const dbModels = require("../../utils/modelName");
const HelperUtils = require("../../utils/helper");
const { ERROR_MSG } = require("../../utils/const")

exports.studenCreateEdit = async (req, res) => {
    try {
        if (!req.body._id) {
            let studentRegisteration = await db.findOne({
                collection: dbModels.StudentRegisteration,
                query: { name: req.body.name }
            })
            if (studentRegisteration) {
                res.send(HelperUtils.error("Already Exists", {}));
                return;
            }
            let newstudent = await db.insertOne({
                collection: dbModels.StudentRegisteration,
                document: req.body
            })
            res.send(HelperUtils.success("Successfully created", newstudent));
        } else {
            let id = req.body._id;
            delete req.body._id;
            let updated = await db.findOneAndUpdate({
                collection: dbModels.StudentRegisteration,
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


exports.studentRegistrationById = async (req, res) => {
    try {
        console.log(req.params.id)
        let studentRegObj = await db.findOne({
            collection: dbModels.StudentRegisteration,
            query: { _id: req.params.id },
            populate: [
                { path: "course" },
                { path: "center" }
            ]

        })
        if (studentRegObj && studentRegObj.status) studentRegObj.status = {
            label: studentRegObj.status,
            value: studentRegObj.status
        }

        res.send(HelperUtils.success("Successfully get Student Registeration", studentRegObj));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));
    }

}



exports.studentRegDelete = async (req, res) => {
    try {
        //first check available in system
        let studentReg = await db.findOne({
            collection: dbModels.StudentRegisteration,
            query: { _id: req.params.id }
        });
        if (!studentReg) {
            res.send(HelperUtils.error("Student Registeration Not Found", {}));
            return;
        }
        await db.updateOne({
            collection: dbModels.StudentRegisteration,
            query: { _id: req.params.id },
            update: { isDel: true, status: "Inactive" }
        })
        res.send(HelperUtils.success("Successfully deleted Stduent Registeration", {}));
        return
    } catch (error) {
        return res.send(HelperUtils.error(ERROR_MSG, error.message));

    }
}



exports.studentRegList = async (req, res) => {
    try {
        let query = { isDel: false }

        if (req.body.status) query.status = req.body.status;
        if (req.body.search) query.name = new RegExp(req.body.search, 'i')

        let result = await db.paginate({
            collection: dbModels.StudentRegisteration,
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