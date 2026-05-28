import { useState } from "react";
import { TaskFormValues, TaskStatus } from "../types";

interface TaskFormProps {
  initialValues: TaskFormValues;
  submitLabel: string;
  onSubmit: (values: TaskFormValues) => void;
}

interface ValidationErrors {
  title?: string;
  description?: string;
  dueDate?: string;
}

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "To do" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
];

export default function TaskForm({
  initialValues,
  submitLabel,
  onSubmit,
}: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (fields: TaskFormValues) => {
    const nextErrors: ValidationErrors = {};
    if (!fields.title.trim()) nextErrors.title = "Title is required.";
    if (!fields.description.trim())
      nextErrors.description = "Description is required.";
    if (!fields.dueDate) nextErrors.dueDate = "Due date is required.";
    return nextErrors;
  };

  const handleChange = (field: keyof TaskFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate(values);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    onSubmit(values);
  };

  return (
    <form className="card form-grid" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          type="text"
          value={values.title}
          onChange={(event) => handleChange("title", event.target.value)}
          placeholder="Enter a descriptive task title"
        />
        {errors.title ? (
          <div className="field-error">{errors.title}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={values.description}
          onChange={(event) => handleChange("description", event.target.value)}
          placeholder="Enter task details and expectations"
        />
        {errors.description ? (
          <div className="field-error">{errors.description}</div>
        ) : null}
      </div>

      <div className="grid-columns columns-2">
        <div>
          <label htmlFor="task-due-date">Due date</label>
          <input
            id="task-due-date"
            type="date"
            value={values.dueDate}
            onChange={(event) => handleChange("dueDate", event.target.value)}
          />
          {errors.dueDate ? (
            <div className="field-error">{errors.dueDate}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="task-status">Status</label>
          <select
            id="task-status"
            value={values.status}
            onChange={(event) => handleChange("status", event.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="button-link large-button" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}
