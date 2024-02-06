import React from "react";
import { Box, Button, Dialog, DialogActions, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack"
import adminServices from "../../../services/adminServices";





export default function DeleteModal({ open, setOpen, tag, id, reDirectFunction }) {
    // const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const onClose = () => {
        setOpen(false);
    }

    async function jobDelete(id) {
        const res = await adminServices.deleteJob(id);
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            onClose()
            reDirectFunction()
        }
        else {
            enqueueSnackbar(res?.data?.message || "Something went wrong!!!", { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top", autoHideDuration: 800 } })
        }
    }

    async function recruiterDelete(id) {
        const res = await adminServices.deleteRecriter(id);
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            onClose()
            reDirectFunction()
        }
        else {
            enqueueSnackbar(res?.data?.message || "Something went wrong!!!", { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top", autoHideDuration: 800 } })
        }
    }

    return (

        <Dialog open={open} onClose={onClose} aria-labelledby="responsive-dialog-title" >

            <DialogTitle id="responsive-dialog-title">
                {`Are you sure you want to delete this ${tag === "JOB" ? "job" : "recruiter"} ?`}
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
                        onClick={() => {
                            if (tag === "JOB") {
                                jobDelete(id)
                            } else {
                                recruiterDelete(id)
                            }
                        }
                        }
                        variant="blackButton" autoFocus>
                        Yes
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}