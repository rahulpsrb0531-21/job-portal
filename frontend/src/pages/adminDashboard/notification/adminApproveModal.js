import React from "react"
import { Box, Button, Dialog, DialogActions, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack"
import notificationServices from "../../../services/notificationServices";

export default function AdminApproveModal({ open, setOpen, getAllNotification, notificationId }) {
    const { enqueueSnackbar } = useSnackbar();
    const onClose = () => {
        setOpen(false)
    }
    async function requestApprove() {
        const data = {
            notificationId
        }
        // console.log(data)
        const res = await notificationServices.updateNotification(data)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            onClose()
            getAllNotification()
        }
        else {
            enqueueSnackbar(res?.data?.message || "Something went wrong!!!", { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top", autoHideDuration: 800 } })
        }
    }

    return (

        <Dialog open={open} onClose={onClose} aria-labelledby="responsive-dialog-title" >

            <DialogTitle id="responsive-dialog-title">
                {"Request approval for the recruiter application from the admin."}
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
                        onClick={() => requestApprove()}
                        variant="blackButton" autoFocus>
                        Yes
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}