import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App.jsx';
import DashboardTableHeader from './DashboardTableHeader.jsx';
import DashboardTableRows from './DashboardTableRows.jsx';
import DashboardTableFooter from './DashboardTableFooter.jsx';
import axios from 'axios';

const DashboardTable = () => {
  const [tracker, setTracker] = useState([]);
  const [showModal, setShowModal] = useState({ action: null, id: null }); // none / edit /add
  const [updateState, setUpdateState] = useState(true);

  const context = useContext(UserContext);

  // get the users data from the DB
  useEffect(() => {
    if (updateState) fetchApplications();
  }, [updateState]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`/user/${context.user.id}/application`);
      if (res.status === 200) {
        setTracker(res.data);
        setUpdateState(false);
      }
    } catch (error) {
      console.log(
        'Error in fetchApplications of DashboardTable component:',
        error
      );
    }
  };

  //Delete application from the DB
  const removeApplications = async (id) => {
    try {
      const res = await axios.delete(
        `/user/${context.user.id}/application/${id}`
      );
      if (res.status === 200) {
        setUpdateState(true);
      }
    } catch (error) {
      console.log(
        'Error in removeApplications of DashboardTable component:',
        error
      );
    }
  };

  return (
    <div>
      <table id="tracker">
        <DashboardTableHeader />
        <DashboardTableRows
          tracker={tracker}
          setShowModal={setShowModal}
          removeApplications={removeApplications}
        />
        <DashboardTableFooter
          tracker={tracker}
          showModal={showModal}
          setShowModal={setShowModal}
          setUpdateState={setUpdateState}
        />
      </table>
    </div>
  );
};

export default DashboardTable;
