import { useEffect, useState } from "react"
import { filter } from 'lodash'
// @mui
import {
    Card, Table, Stack, Paper, Button, Popover, TableRow, MenuItem, TableBody, TableCell, Container, Typography, IconButton,
    TableContainer, TablePagination, Box, Grid, Tab, Tabs, CardContent
} from '@mui/material'
import { useNavigate } from "react-router-dom";
import TableHeadComponent from "../../../sections/adminDashboard/TableHead";
import { AdminListToolbar } from "../../../sections/adminDashboard";
import SearchNotFound from "../../../components/SearchNotFound";
import notificationServices from "../../../services/notificationServices";
import Iconify from "../../../components/Iconify";
import AdminApproveModal from "./adminApproveModal";

const TABLE_HEAD = [
    { id: 'recruiterName', label: 'Recruiter Name', alignRight: false },
    { id: 'job', label: 'Job', alignRight: false },
    { id: 'candidateName', label: 'Candidate Name', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '', label: '', alignRight: false },
]

// ----------------------------------------------------------------------
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user?.candidateName.toLowerCase().indexOf(query.toLowerCase()) !== -1

        );
    }
    return stabilizedThis.map((el) => el[0]);
}


export default function NotificationList() {
    const navigate = useNavigate()
    const [notification, setNotification] = useState([])
    const [open, setOpen] = useState(false)
    const [approve, setApprove] = useState(false)
    const [reject, setReject] = useState(false)
    const [notificationId, setNotificationId] = useState('')
    // console.log(notification)

    const [page, setPage] = useState(0)

    const [order, setOrder] = useState('asc')

    const [selected, setSelected] = useState([])

    const [orderBy, setOrderBy] = useState('name')

    // const [filterCode, setFilterCode] = useState('')
    const [filterName, setFilterName] = useState('')

    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        getAllNotification()
    }, [])

    async function getAllNotification() {
        const res = await notificationServices.getAllNotification()
        if (res && res.success) {
            setNotification(res?.notifications)
        }
    }

    const handleRequestSort = (event, candidate) => {
        const isAsc = orderBy === candidate && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(candidate);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = notification?.map((n) => n.candidateName);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - notification.length) : 0

    const filteredNotification = applySortFilter(notification, getComparator(order, orderBy), filterName)

    const isUserNotFound = filteredNotification.length === 0;

    return (
        <Container sx={{ m: 0, mt: 2.3 }} maxWidth="xl">
            <AdminApproveModal open={open} setOpen={setOpen}
                getAllNotification={getAllNotification}
                notificationId={notificationId}

            />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
                <Typography variant="h3" sx={{ color: "#43425D" }}>
                    Notifications
                </Typography>
            </Stack>
            <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                    <Card
                        sx={{
                            // width: "90rem",
                            height: "auto",
                            boxShadow: "0px 2px 6px #0000000A",
                            borderRadius: 0,
                        }}
                    >
                        <AdminListToolbar
                            numSelected={selected.length}
                            filterName={filterName}
                            onFilterName={handleFilterByName}
                            placeholder={"Search Recruiter name"}
                        />
                        <CardContent sx={{ padding: 0 }}>
                            <TableContainer>
                                <Table>
                                    <TableHeadComponent
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        rowCount={notification.length}
                                        numSelected={selected.length}
                                        onRequestSort={handleRequestSort}
                                        onSelectAllClick={handleSelectAllClick}
                                    />
                                    <TableBody>
                                        {filteredNotification
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, i) => {
                                                console.log(row)
                                                const { candidate, job, status } = row
                                                return (
                                                    <TableRow hover sx={{ cursor: 'pointer' }} tabIndex={-1}
                                                    >
                                                        <TableCell align="left">
                                                            {job?.company?.recruiterName}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {job?.title}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {candidate?.candidateName}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {status}
                                                        </TableCell>
                                                        {
                                                            status === "pending" && (
                                                                <>
                                                                    <TableCell align="left">
                                                                        <Box
                                                                        // onClick={() => {
                                                                        //     setId(row?._id);
                                                                        //     setOpen(true)
                                                                        // }} 
                                                                        >
                                                                            <Iconify icon={"bi:trash-fill"}
                                                                                sx={{ bgColor: "red", width: 24, height: 24 }}
                                                                            />
                                                                        </Box>
                                                                    </TableCell>
                                                                    <TableCell align="left">
                                                                        <Box
                                                                            onClick={() => {
                                                                                setNotificationId(row?._id);
                                                                                setOpen(true)
                                                                            }}
                                                                        >
                                                                            <Iconify icon={"mdi:pencil-box"}
                                                                                sx={{ bgColor: "red", width: 24, height: 24 }}
                                                                            />
                                                                        </Box>
                                                                    </TableCell>
                                                                </>
                                                            )
                                                        }
                                                    </TableRow>
                                                )
                                            })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>

                                    {isUserNotFound && (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                    <SearchNotFound searchQuery={filterName} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                </Table>
                            </TableContainer>
                        </CardContent>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={notification.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}