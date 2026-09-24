import { useEffect, useState } from "react";
import { getActivityLogs } from "../../api/activityApi";

const ActivityMonitor = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const res = await getActivityLogs({ page });
        setLogs(res.data.logs);
        setPages(res.data.pages);
      } catch (err) {
        console.error("Error fetching logs", err);
      }
    };

    loadLogs();
  }, [page]);

  const sortedLogs = [...logs].sort((a, b) => {
    if (a.action === "ASSIGNED_MENTOR" && b.action !== "ASSIGNED_MENTOR") return -1;
    if (a.action !== "ASSIGNED_MENTOR" && b.action === "ASSIGNED_MENTOR") return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  
  


  return (
    <div className="activity-container">
      <h2>📊 Admin Activity Monitor</h2>

      <table>
        <thead>
          <tr>
            <th>Admin</th>
            <th>Activity</th>
            <th>Details</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {sortedLogs.map(log => (
            <tr key={log._id}>
              <td>{log.userId?.name}</td>
              <td>
                {log.action === "ASSIGNED_MENTOR"
                  ? "👥 Mentor Assigned"
                  : "📅 Meeting Scheduled"}
              </td>
              <td>{log.details}</td>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} / {pages}</span>
        <button disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ActivityMonitor;



