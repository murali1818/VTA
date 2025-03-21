<?php
// Include database connection
include('./includes/dbconn.php');

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Initialize error message variable
$errorMessage = "";

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    echo "<br>";  // Debugging statement

   // Handle file upload
if (isset($_FILES['resume']) && $_FILES['resume']['error'] == 0) {
    echo "<br>";  // Debugging statement

    // Define allowed file types and max file size
    $allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    $maxFileSize = 5000000; // 5MB

    // Get file details
    $fileTmpPath = $_FILES['resume']['tmp_name'];
    $fileName = $_FILES['resume']['name'];
    $fileSize = $_FILES['resume']['size'];
    $fileType = $_FILES['resume']['type'];

    // Validate file type and size
    if (!in_array($fileType, $allowedTypes)) {
        $errorMessage = "Invalid file type. Only PDF, DOC, or DOCX files are allowed.";
    } elseif ($fileSize > $maxFileSize) {
        $errorMessage = "File size exceeds the limit of 5MB.";
    } else {
        // Set the upload directory
        $uploadDir = 'uploads/resumes/';
        
        // Generate a unique file name to avoid overwriting existing files
        $fileNameWithoutExt = pathinfo($fileName, PATHINFO_FILENAME); // Get the file name without extension
        $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION); // Get the file extension
        $newFileName = $fileNameWithoutExt . '_' . time() . '.' . $fileExtension; // Append timestamp to the file name

        // Check if the file already exists in the directory and append a number to the filename if it does
        $destination = $uploadDir . $newFileName;
        $i = 1;
        while (file_exists($destination)) {
            $newFileName = $fileNameWithoutExt . '_' . time() . '_' . $i . '.' . $fileExtension;
            $destination = $uploadDir . $newFileName;
            $i++;
        }

        // Move the uploaded file to the destination folder
        if (move_uploaded_file($fileTmpPath, $destination)) {
            $resumePath = $destination;
        } else {
            $errorMessage = "Failed to upload the resume. Please try again.";
        }
    }
} else {
    $errorMessage = "Please upload a resume.";
}


    // If no errors, proceed with database insertion
    if ($errorMessage == "") {
        // Collect form data
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password
        $name = $_POST['name'];
        $gender = $_POST['gender'];
        $dob = $_POST['dob'];
        $college = $_POST['college'];
        $year = $_POST['year'];
        $skills = implode(", ", $_POST['skills']); // Combine skills array into a string
        $projects = json_encode(array_map(function($project, $link) {
            return ['project_name' => $project, 'project_link' => $link];
        }, $_POST['projects'], $_POST['project_links'])); // Combine project info into JSON format

        // Prepare SQL query to insert data into the database
        $sql = "INSERT INTO candidates (email, phone, password, name, gender, dob, college, year, resume, skills, projects)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        // Prepare statement
        if ($stmt = $conn->prepare($sql)) {
            // Bind parameters
            $stmt->bind_param("sssssssssss", $email, $phone, $password, $name, $gender, $dob, $college, $year, $resumePath, $skills, $projects);

            // Execute the query
            if ($stmt->execute()) {
                echo "<br>";  // Debugging statement
                // Display SweetAlert message and redirect
                echo "<script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>";
                echo "<script>
                    Swal.fire({
                        title: 'Thank you!',
                        text: 'We\'ll get back to you shortly.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(function() {
                        window.location.href = 'register.html';
                    });
                </script>";
            } else {
                $errorMessage = "Failed to register. Please try again.";
            }

            // Close the statement
            $stmt->close();
        } else {
            $errorMessage = "Error preparing the query.";
        }
    }

    // Close the database connection
    $conn->close();
}

// Display error message if any
if ($errorMessage != "") {
    echo "<p style='color: red;'>$errorMessage</p>";
}
?>
