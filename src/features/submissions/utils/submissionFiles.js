const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword', // DOC
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
  'application/zip',
  'application/x-zip-compressed',
  'text/plain',
  'image/png',
  'image/jpeg',
  'image/jpg'
];

export const ALLOWED_EXTENSIONS = '.pdf,.doc,.docx,.zip,.txt,.png,.jpg,.jpeg';

export function validateFile(file) {
  if (!file) return null;

  if (file.size > MAX_FILE_SIZE) {
    return 'File size exceeds the 10MB limit.';
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    // Fallback check by extension if mime type is missing or generic
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.split(',').includes(ext)) {
      return 'Unsupported file format. Please upload PDF, DOC, DOCX, ZIP, TXT, PNG, or JPG.';
    }
  }

  return null;
}

export function sanitizeFileName(name) {
  // Remove spaces and special characters, keep periods and alphanumerics
  return name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
}
