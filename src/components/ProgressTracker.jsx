import React, { useState } from 'react';
import { ProgressBar, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateProgressApi } from '../services/api';

function ProgressTracker({ courseId, initialProgress = 0 }) {
  const [progress, setProgress] = useState(initialProgress);
  const [loading, setLoading] = useState(false);

  const milestones = [25, 50, 75, 100];
  const currentMilestone = milestones.find(m => progress < m) || 100;

  const handleProgressUpdate = async (increment) => {
    setLoading(true);
    const newProgress = Math.min(100, Math.max(0, progress + increment));
    try {
      const response = await updateProgressApi(courseId, newProgress);
      if (response.status === 200) {
        setProgress(newProgress);
        toast.success(`Progress updated to ${newProgress}%`);
      } else {
        toast.error(response.data?.message || "Failed to update progress");
      }
    } catch (error) {
      toast.error(!error.response ? "Network error occurred" : error.response?.data?.message || "Error updating progress");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-3">
      <h5>Course Progress</h5>
      <ProgressBar
        now={progress}
        label={`${progress}%`}
        variant={progress === 100 ? "success" : "info"}
      />
      <p>
        {progress >= 100
          ? "Completed!"
          : `Milestone: ${milestones.indexOf(currentMilestone) + 1}/${milestones.length}`}
      </p>
      <div className="d-flex gap-2">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => handleProgressUpdate(10)}
          disabled={progress >= 100 || loading}
        >
          {loading ? "Updating..." : "+10%"}
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => handleProgressUpdate(-10)}
          disabled={progress <= 0 || loading}
        >
          {loading ? "Updating..." : "-10%"}
        </Button>
      </div>
    </div>
  );
}

export default ProgressTracker;