import { useEffect, useState } from "react"
import { filter } from 'lodash';
import candidateServices from "../../../services/candidateServices";
// @mui
import {
    Card, Table, Stack, Paper, Button, Popover, TableRow, MenuItem, TableBody, TableCell, Container, Typography, IconButton,
    TableContainer, TablePagination, Box, Grid, Tab, Tabs, CardContent
} from '@mui/material'
import { useNavigate } from "react-router-dom";
import TableHeadComponent from "../../../sections/adminDashboard/TableHead";
import { AdminListToolbar } from "../../../sections/adminDashboard";
import SearchNotFound from "../../../components/SearchNotFound";
import recruiterServices from "../../../services/recruiterServices";
import DeleteModal from "../../../components/modal/admin/deleteModal";
import Iconify from "../../../components/Iconify";

const TABLE_HEAD = [
    { id: 'name', label: 'Recruiter Name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'companyName', label: 'Company Name', alignRight: false },
    { id: 'companyType', label: 'Company Type', alignRight: false },
    { id: '', alignRight: false },
    { id: '', alignRight: false },
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
        return filter(array, (_user) => _user?.recruiterName.toLowerCase().indexOf(query.toLowerCase()) !== -1

        );
    }
    return stabilizedThis.map((el) => el[0]);
}


export default function RecruiterList() {
    const navigate = useNavigate()
    const [recruiters, setRecruiters] = useState([])

    const [page, setPage] = useState(0)

    const [order, setOrder] = useState('asc')

    const [selected, setSelected] = useState([])

    const [orderBy, setOrderBy] = useState('name')

    const [filterName, setFilterName] = useState('')

    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")

    useEffect(() => {
        getAllRecruiter()
    }, [])

    async function getAllRecruiter() {
        const res = await recruiterServices.getAllRecruiter()
        if (res && res.success) {
            setRecruiters(res?.data)
        }
    }

    const handleRequestSort = (event, candidate) => {
        const isAsc = orderBy === candidate && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(candidate);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = recruiters.map((n) => n.recruiterName);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - recruiters.length) : 0

    const filteredCandidates = applySortFilter(recruiters, getComparator(order, orderBy), filterName)

    const isUserNotFound = filteredCandidates.length === 0;

    return (
        <Container sx={{ m: 0, mt: 2.3 }} maxWidth="xl">
            <DeleteModal open={open} setOpen={setOpen} tag={"RECRUITER"}
                id={id} reDirectFunction={getAllRecruiter}
            />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
                <Typography variant="h3" sx={{ color: "#43425D" }}>
                    Recruiter
                </Typography>
                <Button
                    variant="blackButton"
                    onClick={() => navigate("/admin/create/recruiter")}
                >
                    Add New Recruiter
                </Button>
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
                            placeholder={"Search recuiters..."}
                        />
                        <CardContent sx={{ padding: 0 }}>
                            <TableContainer>
                                <Table>
                                    <TableHeadComponent
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        rowCount={recruiters.length}
                                        numSelected={selected.length}
                                        onRequestSort={handleRequestSort}
                                        onSelectAllClick={handleSelectAllClick}
                                    />
                                    <TableBody>
                                        {filteredCandidates
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, i) => {
                                                console.log(row)
                                                const { recruiterName, email, companyName, companyType } = row
                                                return (
                                                    <TableRow hover sx={{ cursor: 'pointer' }} tabIndex={-1}
                                                    //   onClick={() =>
                                                    //     navigate("referral-detail", { state: row })
                                                    //   }
                                                    >
                                                        <TableCell align="left">
                                                            {recruiterName}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {email}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {companyName}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {companyType}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Box onClick={() => {
                                                                setId(row?._id);
                                                                setOpen(true)
                                                            }} >
                                                                <Iconify icon={"bi:trash-fill"}
                                                                    sx={{ bgColor: "red", width: 24, height: 24 }}
                                                                />
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Box
                                                                onClick={() => navigate('/admin/edit/recruiter', { state: row })}
                                                            >
                                                                <Iconify icon={"mdi:pencil-box"}
                                                                    sx={{ bgColor: "red", width: 24, height: 24 }}
                                                                />
                                                            </Box>
                                                        </TableCell>
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
                            count={recruiters.length}
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