import { useState, useCallback } from 'react';
import { 
  getOwnSubmission, 
  createSubmission, 
  updateSubmission, 
  uploadSubmissionFile, 
  deleteSubmissionFile,
  createSubmissionDownloadUrl
} from '../api/submissionsApi';
import { sanitizeFileName } from '../utils/submissionFiles';

export function useSubmission(assignmentId, studentId) {
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadError, setDownloadError] = useState(null);

  const fetchSubmission = useCallback(async () => {
    if (!assignmentId || !studentId) return;
    setIsLoading(true);
    setError(null);
    const { data, error } = await getOwnSubmission(assignmentId, studentId);
    if (error) {
      setError(error);
    } else {
      setSubmission(data);
    }
    setIsLoading(false);
  }, [assignmentId, studentId]);

  const submitWork = async ({
    assignmentId: overrideAssignmentId,
    studentId: overrideStudentId,
    textContent,
    selectedFile,
    existingSubmission = null
  }) => {
    const activeAssignmentId = overrideAssignmentId || assignmentId;
    const activeStudentId = overrideStudentId || studentId;
    let uploadedFileData = null;
    let oldFilePath = existingSubmission?.file_path;

    // 1. Upload new file if provided
    if (selectedFile) {
      const safeName = sanitizeFileName(selectedFile.name);
      const uniquePath = `${activeStudentId}/${activeAssignmentId}/${crypto.randomUUID()}-${safeName}`;
      
      const uploadRes = await uploadSubmissionFile(uniquePath, selectedFile);
      if (uploadRes.error) {
        return { error: `Upload failed: ${uploadRes.error}` };
      }
      
      uploadedFileData = {
        path: uniquePath,
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      };
    }

    const payload = {
      text_content: textContent?.trim() || null,
    };

    if (uploadedFileData) {
      payload.file_path = uploadedFileData.path;
      payload.file_name = uploadedFileData.name;
      payload.file_size = uploadedFileData.size;
      payload.mime_type = uploadedFileData.type;
    }

    let dbRes;

    if (existingSubmission) {
      // Update existing
      dbRes = await updateSubmission(existingSubmission.id, payload);
      
      if (dbRes.error) {
        console.error("[Submission] Database write failed:", {
          code: dbRes.errorObj?.code,
          message: dbRes.errorObj?.message,
          details: dbRes.errorObj?.details,
        });
        // Rollback new file if DB update fails
        if (uploadedFileData) {
          await deleteSubmissionFile(uploadedFileData.path);
        }
        return { error: `Database update failed: ${dbRes.error}` };
      }

      // Cleanup old file if replaced
      if (uploadedFileData && oldFilePath) {
        await deleteSubmissionFile(oldFilePath);
      }
    } else {
      // Create new
      payload.assignment_id = activeAssignmentId;
      payload.student_id = activeStudentId;

      dbRes = await createSubmission(payload);
      
      if (dbRes.error) {
        console.error("[Submission] Database write failed:", {
          code: dbRes.errorObj?.code,
          message: dbRes.errorObj?.message,
          details: dbRes.errorObj?.details,
        });
        // Rollback new file if DB insert fails
        if (uploadedFileData) {
          await deleteSubmissionFile(uploadedFileData.path);
        }
        return { error: `Database insert failed: ${dbRes.error}` };
      }
    }

    await fetchSubmission(); // Refetch authoritative row
    return { data: dbRes.data };
  };

  const handleDownload = async (filePath) => {
    setDownloadError(null);
    const { data, error } = await createSubmissionDownloadUrl(filePath);
    if (error) {
      setDownloadError(error);
      return null;
    }
    return data;
  };

  return {
    submission,
    isLoading,
    error,
    downloadError,
    fetchSubmission,
    submitWork,
    handleDownload
  };
}
