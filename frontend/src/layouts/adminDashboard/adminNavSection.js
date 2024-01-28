import { useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom'
// material
import { alpha, useTheme, styled } from '@mui/material/styles'
import { Box, List, Collapse, ListItemIcon, ListItemButton, Typography, Divider, Stack } from '@mui/material'
import Iconify from '../../components/Iconify'


const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
    ...theme.typography.body2,
    // height: 40,
    position: 'relative',
    textTransform: 'capitalize',
    color: '#282C3F',
    fontWeight: 300
}));

const ListItemIconStyle = styled(ListItemIcon)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
    item: PropTypes.object,
    active: PropTypes.func,
};

function NavItem({ item, active }) {
    const theme = useTheme();

    const isActiveRoot = active(item.path);

    const { title, path, icon, children } = item;
    // console.log("fd", path, isA)

    const [open, setOpen] = useState(isActiveRoot);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    const activeRootStyle = {
        color: '#0f6fff ',
        fontWeight: 400,
        p: 2,
        // transform: 'scale(2)',
        bgcolor: '#f2f8ff',
        opacity: 0.6
    };

    const activeSubStyle = {
        color: 'text.primary',
        // p: 4,
        // color: 'text.primary',
    };

    if (children) {
        return (
            <>
                <ListItemStyle
                    onClick={handleOpen}
                    sx={{
                        ...(isActiveRoot && activeRootStyle)
                    }}>
                    <Typography variant='sidebarHeading' >{title}</Typography>
                </ListItemStyle>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {children.map((item) => {
                            const { title, path } = item;
                            const isActiveSub = active(path);

                            return (
                                <ListItemStyle
                                    key={title}
                                    component={RouterLink}
                                    to={path}
                                    sx={{
                                        ...(isActiveSub && activeSubStyle),
                                        pl: 2,
                                    }}
                                >
                                    <ListItemIconStyle>
                                        <Box
                                            component="span"
                                            sx={{
                                                width: 4,
                                                height: 4,
                                                display: 'flex',
                                                borderRadius: '50%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: (theme) => theme.transitions.create('transform'),
                                                ...(isActiveSub && {
                                                    transform: 'scale(2)',
                                                    bgcolor: 'primary.main',
                                                    // color: 'blue',
                                                })

                                            }}
                                        />
                                    </ListItemIconStyle>
                                    <Typography variant='sidebarHeading' >{title}</Typography>
                                </ListItemStyle>
                            );
                        })}
                    </List>
                </Collapse>
            </>
        );
    }

    return (
        <ListItemStyle
            component={RouterLink}
            to={path}
            sx={{
                ...(isActiveRoot && activeRootStyle),
                py: 2,
                // width: 0,
                // height: 100,
                "&:hover": {
                    color: '#0f6fff ',
                    fontWeight: 400,
                    p: 2,
                    // transform: 'scale(2)',
                    bgcolor: '#f2f8ff',
                    opacity: 0.6
                }
            }}
        >
            <Stack alignItems={'center'}>
                <Iconify icon={icon} sx={{ width: 22, height: 22 }} />
                <Typography sx={{ fontSize: 12, color: 'rgb(97, 97, 97)' }} >{title}</Typography>
            </Stack>
        </ListItemStyle>
    );
}

AdminNavSection.propTypes = {
    navConfig: PropTypes.array,
};

export default function AdminNavSection({ navConfig, ...other }) {
    const { pathname } = useLocation();

    const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

    return (
        <List>
            {navConfig.map((item) => (
                <Stack alignItems={'center'} sx={{ mr: 12 }} >
                    <NavItem key={item.title} item={item} active={match} />
                </Stack>
            ))
            }
        </List >
    );
}
