import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function MyDrawer() {
    const usenavigate = useNavigate();


    const handleButtonClick = (buttonText) => {
        switch (buttonText) {
            case 'Login':
                usenavigate('/login');
                break;
            case 'Register':
                usenavigate('/register');
                break;
            case 'All Blogs':
                usenavigate('/blog');
                break;
            case 'Create':
                console.log('create out!!!!!');
                usenavigate('/create');
                break;
            case 'Log out':
                console.log('logged out!!!!!');
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                
                usenavigate('/login');
                break;
            default:
                break;
        }
    };

    const drawerWidth = 240;
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            {(localStorage.getItem('token')) ?
                <>
                    <List>
                        {['All Blogs', 'Create'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={() => handleButtonClick(text)}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <HomeIcon /> : <CreateIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItem key="Log out" disablePadding>
                            <ListItemButton onClick={() => handleButtonClick("Log out")}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Log out" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
                :
                <>
                    {['Login', 'Register'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={() => handleButtonClick(text)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <LoginIcon /> : <HowToRegIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </>}
        </div>
    );
    const container = undefined;
    return (
        <Box
            component="nav"
            sx={{
                width: { sm: drawerWidth },
                flexShrink: { sm: 0 },
            }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    )
}
export default MyDrawer;