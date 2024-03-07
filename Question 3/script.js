// Get references to form elements and container elements
const form = document.getElementById("application-form");
let applicationData = {};
const submitButton = document.getElementById("submit-application-button");
const viewApplicationsButton = document.getElementById(
    "view-application-button"
);
const applicationTableContainer = document.getElementById(
    "application-table-container"
);
const applicationTable = document.getElementById("application-table");

// Get reference to container element for adding jobs
const jobHistoryContainer = document.getElementById(
    "employment-history-container"
);

// Get button for adding jobs
const addJobButton = document.getElementById("add-job-button");

// Function to create a new job experience section
function createJobExperienceSection() {
    const jobCount = jobHistoryContainer.childElementCount + 1; // Get current job count
    const newSection = document.createElement("div");
    newSection.classList.add("employment-history-section");
    newSection.innerHTML = `<h3>Previous Job ${jobCount}</h3>
    <div class="form-group">
      <label for="job-title-${jobCount}">Job Title:</label>
      <input type="text" id="job-title-${jobCount}" name="employment_history[${jobCount}][job_title]" required>
    </div>
    <div class="form-group">
      <label for="company-name-${jobCount}">Company Name:</label>
      <input type="text" id="company-name-${jobCount}" name="employment_history[${jobCount}][company_name]" required>
    </div>
    <div class="form-group">
      <label for="start-date-${jobCount}">Start Date:</label>
      <input type="date" id="start-date-${jobCount}" name="employment_history[${jobCount}][start_date]" required>
    </div>
    <div class="form-group">
      <label for="end-date-${jobCount}">End Date:</label>
      <input type="date" id="end-date-${jobCount}" name="employment_history[${jobCount}][end_date]">
    </div>
    <div class="form-group">
      <label for="job-responsibilities-${jobCount}">Job Responsibilities:</label>
      <textarea id="job-responsibilities-${jobCount}" name="employment_history[${jobCount}][job_responsibilities]" rows="3" required></textarea>
    </div>`;
    jobHistoryContainer.appendChild(newSection);
}

// Add event listener to button
addJobButton.addEventListener("click", createJobExperienceSection);

// Get reference to container element for adding references
const referencesContainer = document.getElementById("references-container");

// Get button for adding references
const addReferenceButton = document.getElementById("add-reference-button");

// Function to create a new reference section
function createReferenceSection() {
    const referenceCount = referencesContainer.childElementCount + 1; // Get current reference count
    const newSection = document.createElement("div");
    newSection.classList.add("reference-section");
    newSection.innerHTML = `<h3>Reference ${referenceCount}</h3>
    <div class="form-group">
      <label for="reference-name-${referenceCount}">Name:</label>
      <input type="text" id="reference-name-${referenceCount}" name="references[${referenceCount}][name]" required>
    </div>
    <div class="form-group">
      <label for="reference-contact-info-${referenceCount}">Contact Information:</label>
      <input type="text" id="reference-contact-info-${referenceCount}" name="references[${referenceCount}][contact_info]" required>
    </div>
    <div class="form-group">
      <label for="reference-relationship-${referenceCount}">Relationship to You:</label>
      <input type="text" id="reference-relationship-${referenceCount}" name="references[${referenceCount}][relationship]" required>
    </div>`;
    referencesContainer.appendChild(newSection);
}

// Add event listener to button
addReferenceButton.addEventListener("click", createReferenceSection);

// Function to validate email format
function validateEmail(email) {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Function to validate phone number format (simple example)
function validatePhone(phone) {
    const re = /^\d{11}$/; // Matches 11-digit phone numbers
    return re.test(phone);
}

// Function to validate form on submit
function validateForm(event) {
    event.preventDefault(); // Prevent default form submission

    let isValid = true; // Flag to indicate form validity

    // Check required fields
    const requiredFields = form.querySelectorAll(
        "input[required], textarea[required], select[required]"
    );
    for (const field of requiredFields) {
        if (field.value.trim() === "") {
            field.classList.add("error"); // Add error class for visual indication
            isValid = false;
        } else {
            field.classList.remove("error"); // Remove error class if filled
        }
    }

    // Validate email format
    const emailField = document.getElementById("email");
    if (!validateEmail(emailField.value)) {
        emailField.classList.add("error");
        isValid = false;
    } else {
        emailField.classList.remove("error");
    }

    // Validate phone number format (optional)
    const phoneField = document.getElementById("phone");
    if (phoneField.value !== "" && !validatePhone(phoneField.value)) {
        phoneField.classList.add("error");
        isValid = false;
    } else {
        phoneField.classList.remove("error");
    }

    // Check resume file format (optional)
    const resumeField = document.getElementById("resume");
    if (
        resumeField.files.length > 0 &&
        !/\.pdf$/.test(resumeField.files[0].name)
    ) {
        resumeField.classList.add("error");
        isValid = false;
    } else {
        resumeField.classList.remove("error");
    }

    // Check if any checkboxes are unchecked
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    for (const checkbox of checkboxes) {
        if (!checkbox.checked) {
            checkbox.parentNode.classList.add("error"); // Add error class to parent label
            isValid = false;
        } else {
            checkbox.parentNode.classList.remove("error"); // Remove error class
        }
    }

    if (!isValid) {
        alert("Please fix the errors in the form before submitting.");
    } else {
        alert("Form submitted successfully!");
        // Save form data in a dictionary
        const formData = new FormData(form);

        for (const [key, value] of formData.entries()) {
            applicationData[key] = value;
        }

        console.log(applicationData);
    }
}

// Add event listener to submit button
submitButton.addEventListener("click", validateForm);

// Event listener for "Show in Table" button
viewApplicationsButton.addEventListener("click", (e) => {
    e.preventDefault();
    // Display data in table using applicationData
    displayDataInTable();
});

function displayDataInTable() {
  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    applicationData[key] = value;
  }

  // Get reference to table element
  const table = document.getElementById("application-table");

  // Clear existing table content
  table.innerHTML = '';

  // Create a table row for each key-value pair
  for (const [key, value] of Object.entries(applicationData)) {
    const tableRow = table.insertRow();

    // Create cell for the key
    const keyCell = tableRow.insertCell(0);
    keyCell.textContent = key;

    // Create cell for the value
    const valueCell = tableRow.insertCell(1);
    valueCell.textContent = value;
  }

  // Show the table container
  applicationTableContainer.style.display = "block";
}
