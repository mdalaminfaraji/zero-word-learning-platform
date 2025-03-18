/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";

interface Course {
  id: string;
  name: string;
}

interface Module {
  id: string;
  name: string;
}

interface Audience {
  id: string;
  name: string;
}

interface CourseSendPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (data: {
    courses: string[];
    modules: string[];
    audiences: string[];
  }) => void;
  courses: Course[];
  modules: Module[];
  audiences: Audience[];
  buttonRef: any;
}

const CourseSendPopup: React.FC<CourseSendPopupProps> = ({
  isOpen,
  onClose,
  onSend,
  courses,
  modules,
  audiences,
  buttonRef,
}) => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [isModuleDropdownOpen, setIsModuleDropdownOpen] = useState(false);
  const [isAudienceDropdownOpen, setIsAudienceDropdownOpen] = useState(false);
  const [selectAllCourses, setSelectAllCourses] = useState(false);
  const [selectAllModules, setSelectAllModules] = useState(false);
  const [selectAllAudiences, setSelectAllAudiences] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const courseDropdownRef = useRef<HTMLDivElement>(null);
  const moduleDropdownRef = useRef<HTMLDivElement>(null);
  const audienceDropdownRef = useRef<HTMLDivElement>(null);

  // Position the popup in the center of the page
  useEffect(() => {
    if (isOpen && popupRef.current) {
      // Set position to fixed so it stays in place when scrolling
      popupRef.current.style.position = "fixed";

      // Center the popup in the viewport
      // const popupWidth = popupRef.current.offsetWidth;
      // const popupHeight = popupRef.current.offsetHeight;

      popupRef.current.style.top = `54%`;
      popupRef.current.style.left = `86%`;
      popupRef.current.style.transform = `translate(-50%, -50%)`;

      // Remove any previous right positioning
      popupRef.current.style.right = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  // Handle select all courses
  useEffect(() => {
    if (selectAllCourses) {
      setSelectedCourses(courses.map((course) => course.id));
    } else if (selectedCourses.length === courses.length) {
      setSelectedCourses([]);
    }
  }, [selectAllCourses, courses]);

  // Handle select all modules
  useEffect(() => {
    if (selectAllModules) {
      setSelectedModules(modules.map((module) => module.id));
    } else if (selectedModules.length === modules.length) {
      setSelectedModules([]);
    }
  }, [selectAllModules, modules]);

  // Handle select all audiences
  useEffect(() => {
    if (selectAllAudiences) {
      setSelectedAudiences(audiences.map((audience) => audience.id));
    } else if (selectedAudiences.length === audiences.length) {
      setSelectedAudiences([]);
    }
  }, [selectAllAudiences, audiences]);

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses((prev) => {
      if (prev.includes(courseId)) {
        return prev.filter((id) => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };

  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules((prev) => {
      if (prev.includes(moduleId)) {
        return prev.filter((id) => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const handleAudienceToggle = (audienceId: string) => {
    setSelectedAudiences((prev) => {
      if (prev.includes(audienceId)) {
        return prev.filter((id) => id !== audienceId);
      } else {
        return [...prev, audienceId];
      }
    });
  };

  const handleSendCourse = () => {
    if (
      selectedCourses.length === 0 ||
      selectedModules.length === 0 ||
      selectedAudiences.length === 0
    ) {
      alert("Please select all required fields");
      return;
    }

    onSend({
      courses: selectedCourses,
      modules: selectedModules,
      audiences: selectedAudiences,
    });

    // Reset form
    setSelectedCourses([]);
    setSelectedModules([]);
    setSelectedAudiences([]);
    setSelectAllCourses(false);
    setSelectAllModules(false);
    setSelectAllAudiences(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={popupRef}
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        width: "350px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        overflow: "hidden",
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #E7EAE9",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          Assign courses to people
        </h2>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 20px" }}>
        {/* Select Course */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            Select Course
          </label>

          <div ref={courseDropdownRef} style={{ position: "relative" }}>
            <div
              onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                cursor: "pointer",
                userSelect: "none",
                fontSize: "14px",
              }}
            >
              <span>
                {selectedCourses.length > 0
                  ? `${selectedCourses.length} course${
                      selectedCourses.length > 1 ? "s" : ""
                    } selected`
                  : "Course Name"}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: isCourseDropdownOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {isCourseDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  width: "100%",
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  zIndex: 10,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    borderBottom: "1px solid #E5E7EB",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 500 }}>
                    Select all
                  </span>
                  <input
                    type="checkbox"
                    checked={selectAllCourses}
                    onChange={() => setSelectAllCourses(!selectAllCourses)}
                  />
                </div>

                {courses.map((course) => (
                  <div
                    key={course.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderBottom: "1px solid #F3F4F6",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                    onClick={() => handleCourseToggle(course.id)}
                  >
                    <span>{course.name}</span>
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => {}} // Change is handled by the div click
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Select Module */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            Select Module
          </label>

          <div ref={moduleDropdownRef} style={{ position: "relative" }}>
            <div
              onClick={() => setIsModuleDropdownOpen(!isModuleDropdownOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                cursor: "pointer",
                userSelect: "none",
                fontSize: "14px",
              }}
            >
              <span>
                {selectedModules.length > 0
                  ? `${selectedModules.length} module${
                      selectedModules.length > 1 ? "s" : ""
                    } selected`
                  : "Course Module"}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: isModuleDropdownOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {isModuleDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  width: "100%",
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  zIndex: 10,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    borderBottom: "1px solid #E5E7EB",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 500 }}>
                    Select all
                  </span>
                  <input
                    type="checkbox"
                    checked={selectAllModules}
                    onChange={() => setSelectAllModules(!selectAllModules)}
                  />
                </div>

                {modules.map((module) => (
                  <div
                    key={module.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderBottom: "1px solid #F3F4F6",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                    onClick={() => handleModuleToggle(module.id)}
                  >
                    <span>{module.name}</span>
                    <input
                      type="checkbox"
                      checked={selectedModules.includes(module.id)}
                      onChange={() => {}} // Change is handled by the div click
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Select Audience */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            Audience
          </label>

          <div ref={audienceDropdownRef} style={{ position: "relative" }}>
            <div
              onClick={() => setIsAudienceDropdownOpen(!isAudienceDropdownOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                cursor: "pointer",
                userSelect: "none",
                fontSize: "14px",
              }}
            >
              <span>
                {selectedAudiences.length > 0
                  ? `${selectedAudiences.length} audience${
                      selectedAudiences.length > 1 ? "s" : ""
                    } selected`
                  : "Select Audience"}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: isAudienceDropdownOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {isAudienceDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  width: "100%",
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  zIndex: 10,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    borderBottom: "1px solid #E5E7EB",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 500 }}>
                    Select all
                  </span>
                  <input
                    type="checkbox"
                    checked={selectAllAudiences}
                    onChange={() => setSelectAllAudiences(!selectAllAudiences)}
                  />
                </div>

                {audiences.map((audience) => (
                  <div
                    key={audience.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderBottom: "1px solid #F3F4F6",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                    onClick={() => handleAudienceToggle(audience.id)}
                  >
                    <span>{audience.name}</span>
                    <input
                      type="checkbox"
                      checked={selectedAudiences.includes(audience.id)}
                      onChange={() => {}} // Change is handled by the div click
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendCourse}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#0F172A",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#1E293B";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#0F172A";
          }}
        >
          Send Course
        </button>
      </div>
    </div>
  );
};

export default CourseSendPopup;
