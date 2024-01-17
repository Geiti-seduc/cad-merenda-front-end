import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Tips({ data, visible, setVisible }) {
  if (!data) return null;

  const emptyTips = data.filter((item) => item.list.length === 0);

  return (
    <Dialog
      header={(
        <div className="flex items-center gap-2">
          <InfoOutlinedIcon fontSize="smaller" className="text-blue" />
          <p className="text-base">PAUTAS VAZIAS</p>
        </div>
)}
      closable={false}
      modal={false}
      position="bottom-left"
      visible={visible}
      onHide={() => setVisible(false)}
    >
      { emptyTips.map((item) => (
        <div key={item.id} className="flex flex-col py-1">
          <p className="text-sm">{item.name}</p>
        </div>
      ))}
    </Dialog>
  );
}

Tips.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};

export default Tips;
