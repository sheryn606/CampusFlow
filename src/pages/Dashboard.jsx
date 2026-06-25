import { useState } from "react";
import AddDeadlineModal from "../components/AddDeadlineModal";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>CampusFlow Dashboard</h1>

      <button onClick={() => setIsModalOpen(true)}>
        Add New Deadline
      </button>

      <AddDeadlineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Dashboard;