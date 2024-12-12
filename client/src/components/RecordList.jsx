import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle">{props.record.name}</td>
    <td className="p-4 align-middle">{props.record.position}</td>
    <td className="p-4 align-middle">{props.record.level}</td>
    <td className="p-4 align-middle">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center text-sm font-medium border rounded-md px-3 h-9 hover:bg-slate-100"
          to={`/edit/${props.record._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center text-sm font-medium border rounded-md px-3 h-9 hover:bg-slate-100"
          onClick={() => props.deleteRecord(props.record._id)}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const response = await axios.get("http://localhost:5050/record");
        setRecords(response.data);
      } catch (err) {
        console.error("Error fetching records:", err);
      }
    }

    fetchRecords();
  }, []);

  useEffect(() => {
    const results = records.filter(
      (record) =>
        record.name.toLowerCase().includes(filter.toLowerCase()) ||
        record.position.toLowerCase().includes(filter.toLowerCase()) ||
        record.level.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredRecords(results);
  }, [filter, records]);

  async function deleteRecord(id) {
    try {
      await axios.delete(`http://localhost:5050/record/${id}`);
      setRecords(records.filter((record) => record._id !== id));
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  }

  function recordList() {
    return filteredRecords.map((record) => (
      <Record
        record={record}
        deleteRecord={deleteRecord}
        key={record._id}
      />
    ));
  }

  // Calculate statistics
  const levelStats = filteredRecords.reduce((stats, record) => {
    stats[record.level] = (stats[record.level] || 0) + 1;
    return stats;
  }, {});

  return (
    <>
      <div className="p-4">
        <input
          type="text"
          className="border rounded-md px-3 py-2 w-full mb-4"
          placeholder="Filter by name, position, or level"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="mb-4">
          <p className="text-md font-medium">
            Total Matching Applications: {filteredRecords.length}
          </p>
          <p className="text-md font-medium">
            Applications by Level:
            {Object.entries(levelStats).map(([level, count]) => (
              <span key={level} className="ml-2">
                {level}: {count}
              </span>
            ))}
          </p>
        </div>
      </div>
      <h3 className="text-lg font-semibold p-4">Application Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Position</th>
                <th className="p-4">Level</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
