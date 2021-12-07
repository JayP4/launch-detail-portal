import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Launch } from './interfaces/Launch';
import { getLaunchListUrl } from './utils/api-utils';

const launchListQuery = {
  query: {
    upcoming: false,
  },
  options: {
    limit: 50,
    sort: {
      date_unix: 'desc',
    },
  },
};

export default function LaunchList() {
  const [launches, setLaunchDetailsList] = useState<any[]>([]);
  let navigate = useNavigate();

  async function viewMoreDetailsClickHandler(launch: Launch) {
    navigate(`/launch/${launch.id}`);
  }

  useEffect(() => {
    async function fetchData() {
      fetch(getLaunchListUrl(), {
        body: JSON.stringify(launchListQuery),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setLaunchDetailsList(data.docs);
        });
    }

    fetchData();
  }, []);

  return launches.length > 0 ? (
    <div className={'standard-table padding-10'}>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Date</td>
            <td>More Details</td>
          </tr>
        </thead>
        <tbody>
          {launches.map((launch) => {
            return (
              <tr key={launch.id}>
                <td>{launch.name}</td>
                <td>{launch.date_local}</td>
                <td>
                  <button
                    onClick={() => {
                      viewMoreDetailsClickHandler(launch);
                    }}
                  >
                    View More Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div style={{ textAlign: 'center' }}>Fetching...</div>
  );
}
