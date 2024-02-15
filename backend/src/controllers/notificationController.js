import mongoose from 'mongoose'
import customError from '../custom/customError.js'
import Candidate from '../model/candidateModal.js'
import Recruiter from '../model/recruiterModel.js'
import Application from '../model/applicationSchema.js'
import Notification from '../model/notificationSchema.js'


// @desc    Create new Notification
// @route   POST /api/notification/create
// @access  private
const createNotification = async (req, res) => {
    try {
        // console.log(req.body)
        const { job, candidate, applicationId } = req.body

        const newNotification = Notification({
            job,
            candidate,
            applicationId,
            status: "pending"
        })
        // const applicationExits = await Application.findOne({ _id: applicationId })
        const updatedApplication = await Application.findOneAndUpdate(
            { _id: applicationId },
            { $set: { sentApproveRequest: true, status: "pending" } },
            { new: true }
        )

        const createNotification = await newNotification.save()

        res.status(200).json({
            success: true,
            data: createNotification,
            message: 'Created Notification successfully',
        })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}

// @desc    Get Notification All
// @route   GET /api/Notification/all
// @access  private
const getNotificationAll = async (req, res) => {
    try {

        const notifications = await Notification.find({})
        res.status(200).json({
            success: true,
            notifications,
            message: 'Get All Notification  successfully',
        })

    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}

// @desc    Update Notification
// @route   POST /api/notification/update
// @access  private
const updateNotification = async (req, res) => {
    try {
        const { notificationId } = req.body

        // Find the notification by _id
        // const notification = await db.collection('notifications').findOne({ _id: ObjectId('notification_id_to_find') });
        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId },
            { $set: { status: "approve" } },
            { new: true }
        )
        // console.log(notification?.applicationId)
        // if (!notification) {
        //     console.log("Notification not found")
        //     return
        // }
        if (notification) {
            // Update the application status to "approve"
            const result = await Application.updateOne(
                { _id: notification?.applicationId },
                { $set: { status: 'approve' } },
                { new: true }
            )
            res.status(200).json({
                success: true,
                data: notification,
                message: `Update Notificatino Successfully`,
            })
        }

        // Lookup applicationId from the notification
        //   const applicationId = notification.applicationId;

        // Update the application status to "approve"
        //   const result = await db.collection('applications').updateOne(
        //     { _id: ObjectId(applicationId) },
        //     { $set: { status: 'approve' } }
        //   );

        //   console.log("Application status updated")

        // res.status(200).json({
        //     success: true,
        //     data: notification,
        //     message: `Update Notificatino Successfully`,
        // })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            message: error?.message,
        });
    }
}

export { createNotification, updateNotification, getNotificationAll }