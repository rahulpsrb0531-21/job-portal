import React from "react"
import { Box, Button, Dialog, DialogActions, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack"
import notificationServices from "../services/notificationServices"

export default function ApplicantApproveModal({ open, setOpen, candidate, job, applicationId, getapplicantJob }) {
    const { enqueueSnackbar } = useSnackbar();
    const onClose = () => {
        setOpen(false);
    }
    // console.log("candidate", candidate)
    // console.log("recruiter", recruiter)
    // console.log("application", applicationId)
    async function sendRequest() {
        const data = {
            candidate,
            job,
            applicationId
        }
        // console.log(data)
        const res = await notificationServices.createNotification(data)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            onClose()
            getapplicantJob()
        }
        else {
            enqueueSnackbar(res?.data?.message || "Something went wrong!!!", { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top", autoHideDuration: 800 } })
        }
    }

    return (

        <Dialog open={open} onClose={onClose} aria-labelledby="responsive-dialog-title" >

            <DialogTitle id="responsive-dialog-title">
                {"Submit a request to the admin for application approval."}
            </DialogTitle>
            <DialogActions>
                <Stack direction={'row'} spacing={2} >
                    <Button variant="outlined"
                        size="small"
                        sx={{ fontSize: 12 }}
                        onClick={() => onClose()}
                        autoFocus>
                        No
                    </Button>
                    <Button
                        onClick={() => sendRequest()}
                        variant="blackButton" autoFocus>
                        Yes
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}