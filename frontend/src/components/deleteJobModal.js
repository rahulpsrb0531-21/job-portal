import React from "react";
import { Box, Button, Dialog, DialogActions, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import recruiterServices from "../services/recruiterServices";
import jobServices from "../services/jobServices";





export default function DeleteJobModal({ open, setOpen, jobId, getRecruiterJobs }) {
    // const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const onClose = () => {
        setOpen(false);
    }

    async function jobDelete(jobId) {
        const res = await jobServices.deleteJob(jobId);
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            onClose()
            getRecruiterJobs()
        }
        else {
            enqueueSnackbar(res?.data?.message || "Something went wrong!!!", { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top", autoHideDuration: 800 } })
        }
    }

    return (

        <Dialog open={open} onClose={onClose} aria-labelledby="responsive-dialog-title" >

            <DialogTitle id="responsive-dialog-title">
                {"Are you sure you want to delete this job ?"}
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
                        onClick={() => jobDelete(jobId)}
                        variant="blackButton" autoFocus>
                        Yes
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}