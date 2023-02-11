import React, { useState } from 'react';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Drawer } from './modules/Drawer';
import { QuickUsers } from './modules/QuickUsers';
import './devtools.css';

export const DevTools = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => setOpen(open);

    return (
        <div className="devtools-container">
            <EngineeringIcon fontSize="large" className="devtools-icon" onClick={() => toggleDrawer(true)} />
            <Drawer
                open={open}
                onClose={() => toggleDrawer(false)}
            >
                <div id="devtools-title">Devtools</div>
                <hr />
                <QuickUsers toggleDrawer={toggleDrawer} />
            </Drawer>
        </div>
    )
};
