import { useState, useRef } from 'react';
import { Button } from '../../../components/ui/Button';
import { validateFile, ALLOWED_EXTENSIONS } from '../utils/submissionFiles';

export function SubmissionForm({ assignment, existingSubmission, isSaving, onSubmit, onCancel }) {
  const [textContent, setTextContent] = useState(existingSubmission?.text_content || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [localError, setLocalError] = useState('');
  
  const fileInputRef = useRef(null);

  const type = assignment.submission_type;
  const requireText = type === 'text';
  const requireFile = type === 'file';
  const requireEither = type === 'text_or_file';

  const handleFileChange = (e) => {
    setLocalError('');
    const file = e.target.files[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        setLocalError(error);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setSelectedFile(file);
      }
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    setLocalError('');

    // Validation based on submission_type
    if (requireText && !textContent.trim()) {
      setLocalError('Text content is required for this assignment.');
      return;
    }
    
    if (requireFile && !existingSubmission?.file_path && !selectedFile) {
      setLocalError('A file upload is required for this assignment.');
      return;
    }

    if (requireEither && !textContent.trim() && !existingSubmission?.file_path && !selectedFile) {
      setLocalError('You must provide either text content or a file.');
      return;
    }

    await onSubmit(textContent, selectedFile);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full min-w-0">
      {localError && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 w-full min-w-0 box-border">
          <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
          <p>{localError}</p>
        </div>
      )}

      <div className="space-y-6 w-full min-w-0 box-border">
        {(requireText || requireEither) && (
          <div className="space-y-1.5 flex flex-col w-full min-w-0 box-border">
            <label htmlFor="textContent" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
              Text Content {requireText && <span className="text-red-500">*</span>}
            </label>
            <textarea
              id="textContent"
              name="textContent"
              className="flex w-full min-w-0 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-3 text-sm text-[var(--color-on-surface)] transition-colors placeholder:text-[var(--color-on-surface-variant)] focus-visible:border-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50 box-border min-h-[150px] resize-y"
              placeholder="Enter your response here..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              disabled={isSaving}
            />
          </div>
        )}

        {(requireFile || requireEither) && (
          <div className="space-y-1.5 flex flex-col w-full min-w-0 box-border">
            <label htmlFor="submissionFile" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
              File Attachment {requireFile && !existingSubmission?.file_path && <span className="text-red-500">*</span>}
            </label>
            
            {existingSubmission?.file_path && !selectedFile && (
              <div className="p-3 mb-2 bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg text-sm text-[var(--color-on-surface-variant)] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">draft</span>
                Current file: <span className="font-medium text-[var(--color-on-surface)] truncate">{existingSubmission.file_name}</span>
                <span className="text-xs ml-auto shrink-0 opacity-70">Upload a new file to replace</span>
              </div>
            )}

            <input
              type="file"
              id="submissionFile"
              ref={fileInputRef}
              accept={ALLOWED_EXTENSIONS}
              onChange={handleFileChange}
              disabled={isSaving}
              className="block w-full text-sm text-[var(--color-on-surface-variant)]
                file:mr-4 file:py-2.5 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-[var(--color-surface-container)] file:text-[var(--color-on-surface)]
                hover:file:bg-[var(--color-surface-container-high)]
                file:cursor-pointer file:transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            />
            <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">
              Max size: 10MB. Allowed: {ALLOWED_EXTENSIONS.split(',').join(', ')}.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 pt-5 border-t border-[var(--color-divider)] flex items-center justify-end gap-3 w-full min-w-0 box-border">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? 'Submitting...' : (existingSubmission ? 'Update Submission' : 'Submit Assignment')}
        </Button>
      </div>
    </form>
  );
}
