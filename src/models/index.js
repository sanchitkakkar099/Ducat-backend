const mongoose = require("mongoose");

const models = require("../utils/modelName")
const { AppSettingSchema } = require("./appsetting")
const { CourseSchema, CourseCategorySchema, CourseDropDownSchema } = require("./course")
const { CenterSchema } = require("./center")
const { EnquiriesSchema } = require("./enquery");
const { Enquiry } = require("../utils/modelName");
const { BatchSchema } = require("./batch");
const { FileuploadSchema } = require("./fileupload")
const { ClientSchema } = require("./client")
const { TestimonialSchema } = require("./testimonial")
const { ServiceSchema } = require("./service");
const { GallerySchema } = require("./gallery")
const { RegistrationSchema } = require("./registration")
const { UserSchema } = require("./user")
const { BlogSchema, Blog_CategorySchema } = require("./blog")
const { DriveSchema, Placed_StudentSchema, StudentRegisterationSchema } = require("./placement")
const dbModels = {
    Course: mongoose.model(models.Course, CourseSchema),
    CourseCategory: mongoose.model(models.CourseCategory, CourseCategorySchema),
    CourseDropDown: mongoose.model(models.CourseDropDown, CourseDropDownSchema),
    Center: mongoose.model(models.Center, CenterSchema),
    Enquiry: mongoose.model(models.Enquiry, EnquiriesSchema),
    Batch: mongoose.model(models.Batch, BatchSchema),
    FileUpload: mongoose.model(models.FileUpload, FileuploadSchema),
    Client: mongoose.model(models.Client, ClientSchema),
    Testimonial: mongoose.model(models.Testimonial, TestimonialSchema),
    Service: mongoose.model(models.Service, ServiceSchema),
    Gallery: mongoose.model(models.Gallery, GallerySchema),
    Registration: mongoose.model(models.Registration, RegistrationSchema),
    AppSetting: mongoose.model(models.AppSetting, AppSettingSchema),
    User: mongoose.model(models.User, UserSchema),
    Blog: mongoose.model(models.Blog, BlogSchema),
    BlogCategory: mongoose.model(models.BlogCategory, Blog_CategorySchema),
    Drive: mongoose.model(models.Drive, DriveSchema),
    PlacedStudent: mongoose.model(models.PlacedStudent, Placed_StudentSchema),
    StudentRegisteration: mongoose.model(models.StudentRegisteration, StudentRegisterationSchema)
}


module.exports = dbModels