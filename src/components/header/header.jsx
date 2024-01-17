/* eslint-disable react/jsx-max-depth */
import { React, useState } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/primereact.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './header.scss';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logoEstado from '../../assets/images/alagoasbrasaoazul.svg';
import { handleHome, handleNavigate } from '../../utils/navigateHome';

function Header({ userType }) {
  const role = localStorage.getItem('role');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const loginRoute = '/';
  const signOut = useSignOut();
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let options = [];
  const [user] = useState(localStorage.getItem('name'));

  switch (userType) {
  case 'supplier':
    options = ['PROPOSTAS', 'ESCOLAS', 'CERTIDÕES'];
    break;

  case 'school':
    options = [];
    break;

  case 'nutricionista':
    options = ['PAUTAS', 'ESCOLAS', 'ALIMENTOS', 'CERTIDÕES'];
    break;

  default:
    options = [];
    break;
  }

  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const list = options.map((e) => (
    <ListItem key={ e }>
      <ListItemButton>
        <ListItemText primary={ e } sx={ { textAlign: 'center' } } />
      </ListItemButton>
    </ListItem>
  ));

  const links = options.map((e) => (
    <button
      onClick={ () => handleNavigate(navigate, `/${role}/${e.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`) }
      key={ e }
      className="text-[--blue] font-bold transition-all hover:text-[--blue]
      hover:border-b border-transparent hover:border-[--blue] h-auto inline-block"
    >
      {e}

    </button>
  ));

  const handleLogout = () => {
    localStorage.clear();
    signOut();
    navigate(loginRoute);
  };

  const accept = () => {
    handleLogout();
  };

  const handleConfirmLogout = () => {
    confirmDialog({
      message: 'CERTEZA QUE DESEJA SAIR?',
      header: 'SAIR',
      icon: <ErrorOutlineIcon />,
      className: 'bg-white border border-[--silver]',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'CONFIRMAR',
      rejectLabel: 'CANCELAR',
      accept,
    });
  };

  return (
    <header
      className="flex py-3 px-3 lg:px-5 w-screen
      justify-between items-center bg-white drop-shadow-md"
    >
      <ConfirmDialog />
      <div className="flex lg:hidden px-2">
        <MenuIcon
          fontSize="large"
          className="text-[--concrete] block lg:hidden"
          onClick={ toggleDrawer }
        />
        <Drawer anchor="left" open={ drawer } onClose={ toggleDrawer }>
          <Box sx={ { width: '50vw' } }>
            <List>
              <ListItem sx={ { display: 'flex', justifyContent: 'center' } }>
                <img
                  src={ logoEstado }
                  alt=""
                  className="w-1/4 block lg:hidden"
                />
              </ListItem>
              { list }
            </List>
          </Box>
        </Drawer>

      </div>
      <button
        className="flex items-center justify-center lg:gap-5"
        onClick={ () => handleHome(navigate) }
        type="button"
      >
        <img
          className="h-12 hidden lg:block"
          src={ logoEstado }
          alt=""
        />
        <p className="text-[--orange] font-black text-2xl">
          cad
          <span className="text-[--blue] font-black text-2xl">Merenda</span>
        </p>
      </button>

      <nav className="hidden lg:flex items-center justify-around grow text-[--midnight]">
        {links}
      </nav>
      <Menu
        id="basic-menu"
        anchorEl={ anchorEl }
        open={ open }
        onClose={ handleClose }
        className="block lg:hidden"
        MenuListProps={ {
          'aria-labelledby': 'basic-button',
        } }
      >
        <MenuItem onClick={ handleClose }>
          <span><Link to="/logout">SAIR</Link></span>
        </MenuItem>
      </Menu>
      <Button
        className="flex items-center justify-center lg:gap-5"
        id="basic-button"
        aria-controls={ open ? 'basic-menu' : undefined }
        aria-haspopup="true"
        aria-expanded={ open ? 'true' : undefined }
        onClick={ handleClick }
      >
        <AccountCircleIcon fontSize="large" className="text-[--silver]" />
        <div className="hidden lg:flex items-center justify-center gap-5">
          <p className="text-lg text-[--midnight]">
            {'Bem-Vindo, '}
            <b className="text-[--blue]">{user}</b>
            !
          </p>
        </div>
      </Button>
      <button className="signOut hidden lg:flex" onClick={ handleConfirmLogout }>
        <ExitToAppIcon
          fontSize="large"
          className="text-[--silver] hover:text-[--blue] transition-all"
        />
      </button>
    </header>
  );
}

Header.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default Header;
