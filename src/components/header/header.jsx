/* eslint-disable import/no-unresolved */
/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */

import React, { useState, useEffect, useRef } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Menu from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Menu as MenuPopup } from 'primereact/menu';
import { Button } from 'primereact/button';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import logoEstado from '../../assets/images/alagoasbrasaoazul.svg';
import { optionsByUserType } from './headerUtils';
import SidebarMenu from './SidebarMenu';
import { sizes } from '../../utils/constants';
import CadMerenda from '../CadMerenda/CadMerenda';

function Header({ userType }) {
  const menuRef = useRef(null);
  const role = localStorage.getItem('role');
  const loginRoute = '/';
  const roleByLocation = window.location.pathname.split('/')[1];
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [user] = useState(localStorage.getItem('name'));
  const options = optionsByUserType[userType] || [];
  const [type, setType] = useState('default');
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    if (role === 'admin-nutri' && roleByLocation === 'admin') {
      setType('admin');
    } else if (role === 'admin-nutri' && roleByLocation === 'nutricionista') {
      setType('nutri');
    } else if (role === 'admin-nutri' && type === 'default') {
      setType('nutri');
    }
  }, [role]);

  const links = options.map((e) => (
    <button
      type="button"
      onClick={() => {
        navigate(e.path);
      }}
      key={e.title}
      className="text-blue font-bold transition-all
      hover:text-blue hover:border-b
      border-transparent hover:border-blue h-auto inline-block"
    >
      {e.title}
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

  const confirmLogout = () => {
    confirmDialog({
      message: 'TEM CERTEZA DE QUE DESEJA SAIR?',
      header: 'SAIR DO CADMERENDA',
      className: 'bg-white border border-silver',
      acceptClassName: 'p-Buttons-danger',
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
      accept,
    });
  };

  const handleRoleChange = (newType) => {
    if (role === 'admin-nutri') {
      setType(newType);
    }
    if (newType === 'admin') {
      navigate('/admin/');
    } else if (newType === 'nutri') {
      navigate('/nutricionista/');
    }
  };

  const toggleMenu = (e) => {
    if (window.innerWidth <= sizes.lg) {
      setSidebar(!sidebar);
    } else {
      menuRef.current.toggle(e);
    }
  };

  const handleMenuLogout = (e) => {
    menuRef.current.hide(e);
    confirmLogout();
  };

  const menuItems = {
    default: [
      {
        label: 'SAIR',
        icon: <LogoutIcon className="text-silver mr-3" />,
        command: (e) => {
          handleMenuLogout(e);
        },
      },
    ],
    nutri: [
      {
        label: 'USUÁRIOS',
        items: [
          {
            label: 'Administrador',
            icon: <AdminPanelSettingsIcon
              className="text-silver mr-3"
              fontSize="small"
            />,
            command: () => {
              handleRoleChange('admin');
            },
          },
        ],
      },
      { separator: true },
      {
        label: 'SAIR',
        icon: <LogoutIcon className="text-silver mr-3" fontSize="small" />,
        command: (e) => {
          handleMenuLogout(e);
        },
      },
    ],
    admin: [
      {
        label: 'USUÁRIOS',
        items: [
          {
            label: 'Nutricionista',
            icon: <RestaurantIcon
              className="text-silver mr-3"
              fontSize="small"
            />,
            command: () => {
              handleRoleChange('nutri');
            },
          },
        ],
      },
      { separator: true },
      {
        label: 'SAIR',
        icon: <LogoutIcon className="text-silver mr-3" fontSize="small" />,
        command: (e) => {
          handleMenuLogout(e);
        },
      },
    ],
  };

  const homeButtonRoutes = {
    default: {
      'admin-nutri': '/nutricionista/',
      admin: '/admin/',
      nutricionista: '/nutricionista/',
      supplier: '/fornecedor/',
      gestor: '/escola/',
    },
    admin: '/admin/',
    nutri: '/nutricionista/',
  };

  const handleHome = () => {
    const route = type === 'default' ? homeButtonRoutes[type][userType] : homeButtonRoutes[type];
    navigate(route);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
      className={`flex py-3 px-6 lg:px-10 w-full justify-between items-center
          bg-white drop-shadow-md select-none`}
    >
      <MenuPopup
        model={menuItems[type]}
        popup
        popupAlignment="right"
        ref={menuRef}
      />
      <ConfirmDialog />
      {window.innerWidth < sizes.lg && (
        <SidebarMenu
          sidebarOptions={options}
          visible={sidebar}
          setVisible={setSidebar}
          logout={confirmLogout}
        />
      )}

      <button
        className="flex items-center justify-center lg:gap-5"
        onClick={handleHome}
        type="button"
      >
        <img className="h-12 hidden lg:block" src={logoEstado} alt="" />
        <CadMerenda size="smaller" />
      </button>
      <nav
        className="hidden lg:flex items-center justify-around grow text-[--midnight]"
      >
        {links}
      </nav>
      <nav className="hidden lg:flex gap-6 mr-6">
        <div className="hidden lg:flex items-center justify-center gap-5">
          <p className="text-lg text-[--midnight]">
            {'Bem-vindo, '}
            <b className="text-blue">{user}</b>
            !
          </p>
        </div>
      </nav>
      <Button
        icon={<Menu className="text-blue" fontSize="small" />}
        onClick={toggleMenu}
        size="small"
        text
        rounded
      />
    </header>
  );
}

Header.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default Header;
