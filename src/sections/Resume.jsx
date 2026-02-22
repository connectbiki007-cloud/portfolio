import { useState, useRef, useEffect } from "react";
import Section from "../components/Section";
import { Button } from "../components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { saveFile, getFile, deleteFile } from "../utils/db";

// Simple toast component
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3"
    >
      <span>✅ {message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-white">
        ✕
      </button>
    </motion.div>
  );
};

const Resume = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [textContent, setTextContent] = useState(null);
  const fileInputRef = useRef(null);

  // Load stored file on mount
  useEffect(() => {
    const loadStoredFile = async () => {
      try {
        const storedFile = await getFile("resume");
        if (storedFile) {
          setFile(storedFile);
          const url = URL.createObjectURL(storedFile);
          setFileUrl(url);

          // If text file, read content
          if (storedFile.type.startsWith("text/")) {
            const reader = new FileReader();
            reader.onload = (e) => setTextContent(e.target.result);
            reader.readAsText(storedFile);
          }
        }
      } catch (error) {
        console.error("Failed to load stored file:", error);
      }
    };
    loadStoredFile();
  }, []);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Remove old file from IndexedDB
    try {
      await deleteFile("resume");
    } catch (error) {
      console.error("Error deleting old file:", error);
    }

    // Save new file
    try {
      await saveFile("resume", selectedFile);
    } catch (error) {
      console.error("Error saving file:", error);
      alert("Failed to save file. Please try again.");
      return;
    }

    // Revoke old URL if exists
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setFileUrl(url);

    // Handle text content
    if (selectedFile.type.startsWith("text/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTextContent(event.target.result);
      };
      reader.readAsText(selectedFile);
    } else {
      setTextContent(null);
    }

    setShowToast(true);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 100);
  };

  const handleClearFile = async () => {
    try {
      await deleteFile("resume");
      setFile(null);
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
        setFileUrl(null);
      }
      setTextContent(null);
    } catch (error) {
      console.error("Error clearing file:", error);
    }
  };

  const handleViewResume = () => {
    if (fileUrl) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  // Determine file type for preview
  const getPreviewContent = () => {
    if (!file || !fileUrl) return null;

    const mime = file.type;

    // PDF
    if (mime === "application/pdf") {
      return (
        <iframe
          src={fileUrl}
          title={file.name}
          className="w-full h-full rounded-lg"
        />
      );
    }

    // Images
    if (mime.startsWith("image/")) {
      return (
        <img
          src={fileUrl}
          alt={file.name}
          className="max-w-full max-h-full object-contain mx-auto"
        />
      );
    }

    // Text files
    if (mime.startsWith("text/")) {
      return (
        <pre className="text-left text-gray-300 bg-gray-800 p-4 rounded-lg overflow-auto h-full">
          {textContent || "Loading..."}
        </pre>
      );
    }

    // For other types, show info with download option
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-300">
        <svg
          className="w-20 h-20 mb-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-lg mb-4">
          Preview not available for this file type.
        </p>
        <a
          href={fileUrl}
          download={file.name}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Download File
        </a>
      </div>
    );
  };

  return (
    <Section id="resume" title="Resume" className="bg-gray-950">
      <AnimatePresence>
        {showToast && (
          <Toast message="File uploaded successfully!" onClose={closeToast} />
        )}
      </AnimatePresence>

      <div className="text-center space-y-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg text-gray-300 mb-4 transition-colors duration-300 hover:text-amber-200"
        >
          Want to know more about my experience? Upload any file or download my
          resume.
        </motion.p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={handleUploadClick}
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium"
          >
            Upload File
          </Button>

          {fileUrl && (
            <Button
              onClick={handleViewResume}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium"
            >
              View Uploaded File
            </Button>
          )}

          {file && (
            <Button
              onClick={handleClearFile}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium"
            >
              Clear File
            </Button>
          )}
        </div>

        {file && (
          <p className="text-sm text-gray-400 mt-2">
            Uploaded: {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </p>
        )}
      </div>

      {/* Modal with blur background */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-10 z-50 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col pointer-events-auto border border-gray-700">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                  <h3 className="text-xl font-semibold text-cyan-400 truncate max-w-[70%]">
                    {file ? file.name : "File Preview"}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white text-2xl leading-none"
                  >
                    &times;
                  </button>
                </div>
                <div className="flex-1 p-4 overflow-auto">
                  {getPreviewContent()}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Resume;
