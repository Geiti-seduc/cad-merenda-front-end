import { Sidebar } from 'primereact/sidebar';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/alagoasbrasaoazul.svg';

function SidebarMenu({
  visible, setVisible, logout, sidebarOptions,
}) {
  const navigate = useNavigate();

  const links = sidebarOptions.length > 0 && sidebarOptions.map((e) => (
    <Button
      onClick={() => {
        setVisible(false);
        navigate(e.path);
      }}
      key={e.title}
      label={e.title}
      text
    />
  ));

  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      position="right"
    >
      <div className="flex flex-col justify-between h-full w-full">
        <div className="w-full flex justify-center">
          <img src={logo} alt="logo" className="h-20" />
        </div>
        <div className="flex flex-col h-1/3 justify-between">
          {links}
        </div>
        <div className="w-full flex justify-center">
          <Button
            onClick={logout}
            text
            className="w-10/12"
            label="SAIR"
            icon={<Logout className="text-blue mr-2" />}
          />
        </div>
      </div>
    </Sidebar>

  );
}

SidebarMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  sidebarOptions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
};

export default SidebarMenu;
