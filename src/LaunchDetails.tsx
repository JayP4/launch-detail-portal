import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Launch } from './interfaces/Launch';
import { getLaunchDetailsUrl } from './utils/api-utils';

export default function LaunchDetails() {
  const { launchid } = useParams();
  const [launchDetails, setLaunchDetail] = useState<Launch | undefined>();

  useEffect(() => {
    const fetchLaunchVehicleDeatails = () => {
      if (launchid) {
        fetch(getLaunchDetailsUrl(launchid))
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setLaunchDetail(data);
          });
      }
    };
    fetchLaunchVehicleDeatails();
  }, [launchid]);

  return launchDetails ? (
    <div className={'standard-table padding-10'}>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{launchDetails.name}</td>
          </tr>
          <tr>
            <td>Launch Date</td>
            <td>{launchDetails.date_local}</td>
          </tr>
          <tr>
            <td>Details</td>
            <td>{launchDetails.details}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <div style={{ textAlign: 'center' }}>Fetching...</div>
  );
}
