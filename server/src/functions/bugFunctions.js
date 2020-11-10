import { inRange } from "lodash";

const bugFunctions = {
  inputValidation: ({ title, description, platform, severity }) => {
    const errors = {};
    if (title.trim() === "") {
      errors.title = "Please provide a title for the bug report.";
    }
    if (description.trim() === "") {
      errors.description = "Please provide a description for the bug report.";
    }
    if (platform.trim() === "") {
      errors.platform = "Please provide a platform for the bug report.";
    }
    if (!inRange(severity, 0, 6)) {
      errors.severity =
        "Please provide a severity ranking between 0 - 5 for the bug.";
    }
    return {
      errors,
      valid: Object.keys(errors) < 1,
    };
  },
};

export { bugFunctions };
